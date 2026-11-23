import React, { useEffect, useRef, useState } from 'react';
import {
  ClipboardPaste,
  ImagePlus,
  LockKeyhole,
  MessageCircleHeart,
  Mic,
  MicOff,
  ShieldAlert,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { analyzeMessage, ApiError } from '../api';
import { Chip } from '../components/Chip';
import { ErrorCard } from '../components/ErrorCard';
import { GlassCard } from '../components/GlassCard';
import { GradientButton } from '../components/GradientButton';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { Pip } from '../components/Pip';
import { Toggle } from '../components/Toggle';
import { APP_CONFIG, SPEECH_LANG_MAP, SUPPORTED_IMAGE_TYPES } from '../config';
import { useAppContext } from '../context/ResultContext';
import { CHECKER_SAMPLES } from '../data/scams';

interface SpeechRecognitionInstance {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionInstance;

function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  const win = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
}

async function resizeImageToJpegDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image'));
      img.onload = () => {
        const maxDim = APP_CONFIG.maxImageDimensionPx;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width >= height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas unavailable'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', APP_CONFIG.imageJpegQuality);
        resolve(dataUrl);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

export default function Check() {
  const { language, t, setResultData, openChat } = useAppContext();
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [parentMode, setParentMode] = useState(false);
  const [statusNote, setStatusNote] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const speechSupported =
    typeof window !== 'undefined' && getSpeechRecognitionCtor() !== null;

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const handlePaste = async () => {
    setStatusNote(null);
    setErrorState(null);
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) {
        setText(clip.slice(0, APP_CONFIG.maxTextLength));
        setStatusNote(t.check.pastedFeedback);
      } else {
        setStatusNote(t.check.clipboardError);
      }
    } catch {
      setStatusNote(t.check.clipboardError);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusNote(null);
    setErrorState(null);
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!SUPPORTED_IMAGE_TYPES.includes(file.type as (typeof SUPPORTED_IMAGE_TYPES)[number])) {
      setStatusNote(t.check.imageErrorType);
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setStatusNote(t.check.imageErrorSize);
      return;
    }

    try {
      const resizedDataUrl = await resizeImageToJpegDataUrl(file);
      const base64Length = Math.ceil((resizedDataUrl.length * 3) / 4);
      if (base64Length > APP_CONFIG.maxImageBytes) {
        setStatusNote(t.check.imageErrorSize);
        return;
      }
      setImageBase64(resizedDataUrl);
    } catch {
      setStatusNote(t.check.imageErrorType);
    }
  };

  const handleToggleSpeech = () => {
    setStatusNote(null);
    setErrorState(null);

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.lang = SPEECH_LANG_MAP[language];
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcripts: string[] = [];
      for (let i = 0; i < event.results.length; i++) {
        const res = event.results[i];
        if (res && res[0]?.transcript) {
          transcripts.push(res[0].transcript);
        }
      }
      const spoken = transcripts.join(' ').trim();
      if (spoken) {
        setText((prev) =>
          (prev ? `${prev} ${spoken}` : spoken).slice(0, APP_CONFIG.maxTextLength),
        );
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  const runCheck = async () => {
    setStatusNote(null);
    setErrorState(null);

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setStatusNote(t.check.offlineWarning);
      return;
    }

    const trimmed = text.trim();
    if (!trimmed && !imageBase64) {
      setStatusNote(t.check.emptyWarning);
      return;
    }

    if (trimmed.length > APP_CONFIG.maxTextLength) {
      setStatusNote(t.check.tooLongWarning);
      return;
    }

    const mode = parentMode ? 'parent' : 'self';
    setIsLoading(true);

    try {
      const response = await analyzeMessage({
        text: trimmed || null,
        image_base64: imageBase64,
        language,
        mode,
      });

      setResultData({
        response,
        messageText: trimmed || response.extracted_text || '',
        mode,
        language,
        hasImage: Boolean(imageBase64),
      });

      navigate('/result');
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setErrorState(t.error.rateLimit);
      } else if (err instanceof ApiError && err.status >= 400 && err.status < 500 && err.status !== 408) {
        setErrorState(err.message);
      } else {
        setErrorState(t.error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void runCheck();
  };

  return (
    <div className="space-y-7 max-w-3xl mx-auto">
      <LoadingOverlay visible={isLoading} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <Pip mood="neutral" size={104} />
        <div>
          <h1 className="font-heading font-extrabold text-[30px] sm:text-[38px] text-[#F4F6FF] leading-tight">
            {t.check.title}
          </h1>
          <p className="text-[18px] text-[#A9B1D6] mt-1.5">{t.check.subtitle}</p>
        </div>
      </div>

      {errorState && (
        <ErrorCard
          message={errorState}
          onRetry={() => {
            void runCheck();
          }}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Glass Note Input */}
        <GlassCard className="p-5 sm:p-7 space-y-4">
          <label htmlFor="scam-message-input" className="sr-only">
            {t.check.placeholder}
          </label>
          <textarea
            id="scam-message-input"
            rows={6}
            value={text}
            maxLength={APP_CONFIG.maxTextLength}
            onChange={(e) => {
              setText(e.target.value);
              setStatusNote(null);
            }}
            placeholder={t.check.placeholder}
            className="w-full rounded-2xl bg-[#070B1A]/65 border border-white/15 p-4 text-[18px] font-mono-msg text-[#F4F6FF] placeholder:text-[#A9B1D6]/70 focus:border-[#3DE0FF] focus:outline-none resize-y min-h-[168px]"
          />

          {/* Friendly OTP/PIN reminder */}
          <div className="flex items-center justify-between gap-3 flex-wrap text-[15px] text-[#A9B1D6]">
            <p className="inline-flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#FFC24D] shrink-0" />
              <span>{t.check.reminder}</span>
            </p>
            <span className="tabular-nums text-[14px]">
              {text.length}/{APP_CONFIG.maxTextLength}
            </span>
          </div>

          {/* Screenshot preview if uploaded */}
          {imageBase64 && (
            <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/[0.05] border border-[#3DE0FF]/35 p-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={imageBase64}
                  alt={t.check.imageReady}
                  className="w-14 h-14 rounded-xl object-cover border border-white/20 shrink-0"
                />
                <span className="text-[16px] font-semibold text-[#F4F6FF] truncate">
                  {t.check.imageReady}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setImageBase64(null)}
                aria-label={t.check.removeImage}
                className="min-h-[44px] min-w-[44px] px-3 rounded-full bg-white/10 hover:bg-[#FF5C8A]/20 text-[#F4F6FF] inline-flex items-center justify-center gap-1.5 text-[14px] font-semibold cursor-pointer shrink-0"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">{t.check.removeImage}</span>
              </button>
            </div>
          )}

          {/* Action buttons row: Paste, Upload screenshot, Speak */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => void handlePaste()}
              className="min-h-[48px] px-4 py-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 text-[#F4F6FF] text-[16px] font-bold inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ClipboardPaste className="w-5 h-5 text-[#3DE0FF]" />
              <span>{t.check.pasteBtn}</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => void handleImageChange(e)}
              className="hidden"
              aria-label={t.check.uploadBtn}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="min-h-[48px] px-4 py-2.5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 text-[#F4F6FF] text-[16px] font-bold inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ImagePlus className="w-5 h-5 text-[#7C6CFF]" />
              <span>{t.check.uploadBtn}</span>
            </button>

            {speechSupported && (
              <button
                type="button"
                onClick={handleToggleSpeech}
                className={`min-h-[48px] px-4 py-2.5 rounded-full border text-[16px] font-bold inline-flex items-center gap-2 cursor-pointer transition-colors ${
                  isListening
                    ? 'bg-[#FF5C8A]/25 border-[#FF5C8A] text-[#FFE3EC]'
                    : 'bg-white/[0.07] hover:bg-white/[0.12] border-white/15 text-[#F4F6FF]'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 text-[#FF5C8A]" />
                ) : (
                  <Mic className="w-5 h-5 text-[#FF9BD2]" />
                )}
                <span>{isListening ? t.check.stopSpeakBtn : t.check.speakBtn}</span>
              </button>
            )}
          </div>

          {isListening && (
            <p className="text-[16px] font-semibold text-[#3DE0FF]">
              {t.check.listeningLabel}
            </p>
          )}

          {statusNote && (
            <p role="status" className="text-[16px] font-semibold text-[#FFC24D]">
              {statusNote}
            </p>
          )}
        </GlassCard>

        {/* Checking for a parent toggle */}
        <GlassCard className="p-5 sm:p-6">
          <Toggle
            id="parent-mode-toggle"
            checked={parentMode}
            onChange={setParentMode}
            label={t.check.parentToggleTitle}
            description={t.check.parentToggleDesc}
          />
        </GlassCard>

        {/* Four sample chips */}
        <div className="space-y-3">
          <p className="text-[16px] font-bold text-[#A9B1D6]">
            {t.check.samplesLabel}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {CHECKER_SAMPLES.map((sample) => (
              <Chip
                key={sample.id}
                label={t.check.samples[sample.id]}
                active={text.trim() === sample.text}
                onClick={() => {
                  setText(sample.text);
                  setStatusNote(null);
                  setErrorState(null);
                }}
              />
            ))}
          </div>
        </div>

        {/* Submit & privacy note */}
        <div className="space-y-3 pt-1">
          <GradientButton
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="w-full"
          >
            <Sparkles className="w-5 h-5" />
            <span>{t.check.submitBtn}</span>
          </GradientButton>

          <p className="text-center text-[15px] text-[#A9B1D6] inline-flex items-center justify-center gap-2 w-full">
            <LockKeyhole className="w-4 h-4 text-[#3DE0FF]" />
            <span>{t.check.privacyNote}</span>
          </p>

          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={() => openChat()}
              className="min-h-[44px] px-5 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-[#F4F6FF] text-[16px] font-bold inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MessageCircleHeart className="w-5 h-5 text-[#FF9BD2]" />
              <span>{t.chat.askPipCta}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
