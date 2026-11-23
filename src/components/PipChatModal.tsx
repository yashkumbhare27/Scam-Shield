import React, { useEffect, useRef, useState } from 'react';
import {
  Mic,
  MicOff,
  RotateCcw,
  Send,
  Sparkles,
  Square,
  Volume2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { sendChatMessage } from '../api';
import { SPEECH_LANG_MAP } from '../config';
import { useAppContext } from '../context/ResultContext';
import type { ChatMessage } from '../types';
import { Pip } from './Pip';

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

export function PipChatModal() {
  const {
    isChatOpen,
    closeChat,
    pendingChatPrompt,
    clearPendingChatPrompt,
    language,
    t,
    liteMode,
    resultData,
  } = useAppContext();

  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(t.chat.starterQuestions);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const listEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const speechInputSupported =
    typeof window !== 'undefined' && getSpeechRecognitionCtor() !== null;
  const speechOutputSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (messages.length === 0) {
      setSuggestions(t.chat.starterQuestions);
    }
  }, [language, t.chat.starterQuestions, messages.length]);

  useEffect(() => {
    if (isChatOpen) {
      listEndRef.current?.scrollIntoView({ behavior: disableMotion ? 'auto' : 'smooth' });
    }
  }, [messages, isSending, isChatOpen, disableMotion]);

  useEffect(() => {
    return () => {
      if (speechOutputSupported) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
    };
  }, [speechOutputSupported]);

  const submitPrompt = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isSending) return;

    const nextHistory: ChatMessage[] = [
      ...messages,
      { role: 'user', text: trimmed },
    ];
    setMessages(nextHistory);
    setInput('');
    setIsSending(true);

    try {
      const contextSummary = resultData
        ? {
            verdict: resultData.response.verdict,
            red_flag_types: resultData.response.red_flags.map((f) => f.type),
            link_risks: resultData.response.links.map((l) => l.risk),
            mode: resultData.mode,
          }
        : undefined;

      const res = await sendChatMessage({
        messages: nextHistory,
        language,
        context: contextSummary,
      });

      setMessages((prev) => [...prev, { role: 'model', text: res.reply }]);
      if (res.suggestions.length > 0) {
        setSuggestions(res.suggestions);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: t.error.message,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (isChatOpen && pendingChatPrompt) {
      const promptToRun = pendingChatPrompt;
      clearPendingChatPrompt();
      void submitPrompt(promptToRun);
    }
  });

  const handleToggleSpeechInput = () => {
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
      const spoken = event.results?.[0]?.[0]?.transcript?.trim() || '';
      if (spoken) {
        setInput((prev) => (prev ? `${prev} ${spoken}` : spoken).slice(0, 1500));
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };

  const handleSpeakReply = (idx: number, text: string) => {
    if (!speechOutputSupported) return;
    if (speakingIndex === idx) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = SPEECH_LANG_MAP[language];
    utt.rate = 0.94;
    utt.onend = () => setSpeakingIndex(null);
    utt.onerror = () => setSpeakingIndex(null);
    setSpeakingIndex(idx);
    window.speechSynthesis.speak(utt);
  };

  const handleResetChat = () => {
    if (speechOutputSupported) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
    }
    setMessages([]);
    setSuggestions(t.chat.starterQuestions);
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeChat}
          className="fixed inset-0 z-[85] bg-[#070B1A]/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={t.chat.title}
            initial={
              disableMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              disableMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 18, scale: 0.98 }
            }
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-surface w-full sm:max-w-2xl h-[86dvh] sm:h-[78vh] rounded-t-[28px] sm:rounded-[28px] flex flex-col overflow-hidden border-[#3DE0FF]/35 shadow-[0_24px_80px_rgba(3,6,18,0.85)]"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/12 flex items-center justify-between gap-3 bg-[#0E1530]/75">
              <div className="flex items-center gap-3 min-w-0">
                <Pip mood={isSending ? 'searching' : 'happy'} size={52} />
                <div className="min-w-0">
                  <h2 className="font-heading font-extrabold text-[20px] text-[#F4F6FF] truncate">
                    {t.chat.title}
                  </h2>
                  <p className="text-[14px] text-[#A9B1D6] truncate">
                    {t.chat.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetChat}
                    aria-label={t.chat.clearBtn}
                    title={t.chat.clearBtn}
                    className="min-h-[44px] min-w-[44px] px-3 rounded-full bg-white/[0.07] hover:bg-white/[0.14] border border-white/15 text-[#A9B1D6] hover:text-[#F4F6FF] inline-flex items-center justify-center gap-1.5 text-[14px] font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.chat.clearBtn}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeChat}
                  aria-label={t.chat.closeBtn}
                  className="min-h-[44px] min-w-[44px] rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-[#F4F6FF] inline-flex items-center justify-center cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Context + Privacy Banner */}
            <div className="px-5 py-2.5 bg-white/[0.03] border-b border-white/[0.08] flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#A9B1D6]">
              <span>{t.chat.privacyNote}</span>
              {resultData && (
                <span className="text-[#3DE0FF] font-bold">
                  {t.chat.contextBanner}
                </span>
              )}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4">
              {/* Pip Welcome Message */}
              <div className="flex items-start gap-3">
                <div className="rounded-2xl rounded-tl-sm bg-white/[0.07] border border-white/12 px-4 py-3.5 max-w-[88%]">
                  <p className="text-[18px] text-[#F4F6FF] leading-relaxed">
                    {t.chat.welcome}
                  </p>
                </div>
              </div>

              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                const isSpeakingThis = speakingIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      isUser ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`rounded-2xl px-4 py-3.5 max-w-[88%] text-[18px] leading-relaxed ${
                        isUser
                          ? 'rounded-tr-sm text-[#0A0F24] font-semibold'
                          : 'rounded-tl-sm bg-white/[0.07] border border-white/12 text-[#F4F6FF]'
                      }`}
                      style={
                        isUser
                          ? { background: 'var(--gradient-primary)' }
                          : undefined
                      }
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                      {!isUser && speechOutputSupported && (
                        <button
                          type="button"
                          onClick={() => handleSpeakReply(idx, msg.text)}
                          className="mt-2 min-h-[36px] px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/12 text-[14px] font-bold text-[#3DE0FF] inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {isSpeakingThis ? (
                            <>
                              <Square className="w-3.5 h-3.5 fill-current" />
                              <span>{t.chat.stopReply}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-4 h-4" />
                              <span>{t.chat.listenReply}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              {isSending && (
                <div className="flex items-start">
                  <div className="rounded-2xl rounded-tl-sm bg-white/[0.07] border border-[#3DE0FF]/30 px-4 py-3 text-[17px] text-[#3DE0FF] font-semibold inline-flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>{t.chat.thinking}</span>
                  </div>
                </div>
              )}

              {/* Clickable AI Suggestions inside Chat */}
              {!isSending && suggestions.length > 0 && (
                <div className="pt-2 space-y-2">
                  <p className="text-[14px] font-bold text-[#A9B1D6]">
                    {t.chat.suggestionsLabel}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((q, idx) => (
                      <button
                        key={`${q}-${idx}`}
                        type="button"
                        onClick={() => void submitPrompt(q)}
                        className="min-h-[42px] px-4 py-2 rounded-full bg-[#3DE0FF]/12 hover:bg-[#3DE0FF]/22 border border-[#3DE0FF]/40 text-left text-[15px] font-semibold text-[#F4F6FF] cursor-pointer transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={listEndRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submitPrompt(input);
              }}
              className="p-3 sm:p-4 border-t border-white/12 bg-[#0E1530]/85 flex items-center gap-2"
            >
              {speechInputSupported && (
                <button
                  type="button"
                  onClick={handleToggleSpeechInput}
                  aria-label={
                    isListening ? t.check.stopSpeakBtn : t.check.speakBtn
                  }
                  className={`min-h-[48px] min-w-[48px] rounded-full border inline-flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                    isListening
                      ? 'bg-[#FF5C8A]/25 border-[#FF5C8A] text-[#FF5C8A]'
                      : 'bg-white/[0.07] border-white/15 text-[#FF9BD2] hover:bg-white/[0.14]'
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5" />
                  )}
                </button>
              )}

              <input
                type="text"
                value={input}
                maxLength={1500}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chat.placeholder}
                aria-label={t.chat.placeholder}
                className="flex-1 min-h-[48px] px-4 rounded-full bg-[#070B1A]/75 border border-white/15 text-[17px] text-[#F4F6FF] placeholder:text-[#A9B1D6]/70 focus:border-[#3DE0FF] focus:outline-none"
              />

              <button
                type="submit"
                disabled={isSending || !input.trim()}
                aria-label={t.chat.sendBtn}
                style={{ background: 'var(--gradient-primary)' }}
                className="min-h-[48px] min-w-[48px] px-4 rounded-full text-[#0A0F24] font-extrabold inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">{t.chat.sendBtn}</span>
              </button>
            </form>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
