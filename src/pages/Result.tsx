import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ExternalLink,
  HeartHandshake,
  LifeBuoy,
  ShieldCheck,
  Square,
  ThumbsDown,
  ThumbsUp,
  Users,
  Volume2,
} from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { sendFeedback } from '../api';
import { AISuggestions } from '../components/AISuggestions';
import { GlassCard } from '../components/GlassCard';
import { GradientButton } from '../components/GradientButton';
import { HighlightedMessage } from '../components/HighlightedMessage';
import { Pip, type PipMood } from '../components/Pip';
import { ReasonCard } from '../components/ReasonCard';
import { TrustMeter } from '../components/TrustMeter';
import { VerdictStamp } from '../components/VerdictStamp';
import { SPEECH_LANG_MAP } from '../config';
import { useAppContext } from '../context/ResultContext';
import type { Verdict } from '../types';

const VERDICT_TO_PIP: Record<Verdict, PipMood> = {
  likely_scam: 'worried',
  suspicious: 'neutral',
  no_red_flags: 'happy',
};

export default function Result() {
  const { resultData, t, language } = useAppContext();
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [showParentCard, setShowParentCard] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState<'yes' | 'no' | null>(null);

  const speechSupported =
    typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    return () => {
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechSupported]);

  if (!resultData) {
    return <Navigate to="/check" replace />;
  }

  const { response, messageText, mode } = resultData;
  const displayMessage = messageText || response.extracted_text || '';
  const highRiskLinks = response.links.filter(
    (l) => l.risk === 'high' || l.risk === 'medium',
  );
  const pipMood = VERDICT_TO_PIP[response.verdict];
  const isParentMode = mode === 'parent';

  const handleToggleStep = (idx: number) => {
    setCheckedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleListen = () => {
    if (!speechSupported) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(response.spoken_text);
    utterance.lang = SPEECH_LANG_MAP[resultData.language || language];
    utterance.rate = 0.94;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleFeedback = async (wasCorrect: boolean) => {
    if (feedbackSent) return;
    setFeedbackSent(wasCorrect ? 'yes' : 'no');
    try {
      await sendFeedback({
        verdict: response.verdict,
        was_correct: wasCorrect,
        language: resultData.language || language,
      });
    } catch {
      // Keep thank-you state gracefully even if feedback ping fails
    }
  };

  return (
    <div className="space-y-7 max-w-3xl mx-auto">
      {/* Hero verdict block */}
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Pip mood={pipMood} size={132} />

          <div className="flex-1 w-full space-y-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <VerdictStamp verdict={response.verdict} />
              {response.reputation?.reported_count &&
                response.reputation.reported_count > 0 && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#FF5C8A]/15 border border-[#FF5C8A]/40 px-3.5 py-1.5 text-[14px] font-bold text-[#FFD2DF]">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>
                      {t.result.reputationBadge.replace(
                        '{count}',
                        String(response.reputation.reported_count),
                      )}
                    </span>
                  </span>
                )}
            </div>

            <TrustMeter
              verdict={response.verdict}
              confidence={response.confidence}
            />
          </div>
        </div>

        {/* Listen button & Explain for parent */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-white/10">
          {speechSupported && response.spoken_text && (
            <GradientButton
              type="button"
              variant={isSpeaking ? 'danger' : 'primary'}
              onClick={handleListen}
            >
              {isSpeaking ? (
                <>
                  <Square className="w-5 h-5 fill-current" />
                  <span>{t.result.stopListenBtn}</span>
                  {/* Animated audio wave bars */}
                  <span aria-hidden="true" className="inline-flex items-center gap-1 ml-1 h-4">
                    <span className="w-1 h-2 bg-current rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-current rounded-full animate-pulse" />
                    <span className="w-1 h-2.5 bg-current rounded-full animate-pulse" />
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="w-5 h-5" />
                  <span>{t.result.listenBtn}</span>
                </>
              )}
            </GradientButton>
          )}

          {!isParentMode && (
            <GradientButton
              type="button"
              variant="ghost"
              onClick={() => setShowParentCard((v) => !v)}
            >
              <HeartHandshake className="w-5 h-5 text-[#FF9BD2]" />
              <span>{t.result.parentRevealBtn}</span>
            </GradientButton>
          )}
        </div>
      </GlassCard>

      {/* Parent Explanation Card (automatic in parent mode, or toggled in self mode) */}
      {(isParentMode || showParentCard) && (
        <GlassCard className="p-6 sm:p-7 border-[#3DE0FF]/45 shadow-[0_0_32px_rgba(61,224,255,0.18)]">
          <div className="flex items-center gap-2.5 text-[#3DE0FF] font-heading font-bold text-[18px] mb-2">
            <HeartHandshake className="w-5 h-5 shrink-0" />
            <span>{t.result.parentCardTitle}</span>
          </div>
          <p className="text-[21px] sm:text-[23px] font-bold text-[#F4F6FF] leading-relaxed">
            {response.simple_explanation}
          </p>
        </GlassCard>
      )}

      {/* Highlighted Message */}
      {displayMessage && (
        <section className="space-y-3">
          <h2 className="font-heading font-extrabold text-[22px] text-[#F4F6FF]">
            {t.result.messageTitle}
          </h2>
          <HighlightedMessage
            message={displayMessage}
            redFlags={response.red_flags}
            links={response.links}
            verdict={response.verdict}
          />
        </section>
      )}

      {/* Link Warning Card for high/medium risk links */}
      {highRiskLinks.length > 0 && (
        <GlassCard className="p-6 border-[#FF5C8A]/45">
          <div className="flex items-center gap-2.5 text-[#FF5C8A] font-heading font-extrabold text-[20px] mb-3">
            <AlertTriangle className="w-6 h-6 shrink-0" />
            <h2>{t.result.linkWarningTitle}</h2>
          </div>
          <div className="space-y-3">
            {highRiskLinks.map((link, idx) => (
              <div
                key={`${link.url}-${idx}`}
                className="rounded-2xl bg-[#070B1A]/60 border border-white/10 p-4"
              >
                <p className="font-mono-msg text-[15px] text-[#FF9BB8] break-all font-semibold">
                  {link.url}
                </p>
                <p className="text-[18px] text-[#F4F6FF]/90 mt-1.5">
                  {link.reason}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {/* Numbered Reason Cards */}
      <section className="space-y-3">
        <h2 className="font-heading font-extrabold text-[22px] text-[#F4F6FF]">
          {t.result.reasonsTitle}
        </h2>
        {response.red_flags.length > 0 ? (
          <div className="space-y-3">
            {response.red_flags.map((flag, idx) => (
              <ReasonCard
                key={`${flag.type}-${idx}`}
                index={idx + 1}
                flag={flag}
                verdict={response.verdict}
              />
            ))}
          </div>
        ) : (
          <GlassCard className="p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#4CF2B0] shrink-0 mt-0.5" />
              <p className="text-[18px] text-[#F4F6FF]/90 leading-relaxed">
                {response.simple_explanation || t.result.noReasonsText}
              </p>
            </div>
          </GlassCard>
        )}
      </section>

      {/* What to do now (3 tappable checklist rows) */}
      <section className="space-y-3">
        <h2 className="font-heading font-extrabold text-[22px] text-[#F4F6FF]">
          {t.result.nextStepsTitle}
        </h2>
        <div className="space-y-3">
          {response.next_steps.slice(0, 3).map((step, idx) => {
            const done = Boolean(checkedSteps[idx]);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleToggleStep(idx)}
                aria-pressed={done}
                className={`w-full text-left glass-surface p-5 min-h-[64px] flex items-center gap-4 transition-colors cursor-pointer ${
                  done
                    ? 'border-[#4CF2B0]/50 bg-[#4CF2B0]/10'
                    : 'hover:bg-white/[0.09]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    done
                      ? 'bg-[#4CF2B0] border-[#4CF2B0] text-[#0A0F24]'
                      : 'border-white/30 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </span>
                <span
                  className={`text-[18px] font-semibold leading-snug ${
                    done ? 'line-through text-[#A9B1D6]' : 'text-[#F4F6FF]'
                  }`}
                >
                  {step}
                </span>
              </button>
            );
          })}
        </div>
        {response.report_info && (
          <p className="text-[16px] text-[#A9B1D6] px-1">
            {response.report_info}
          </p>
        )}
      </section>

      {/* AI Suggestions for this message */}
      <AISuggestions
        verdict={response.verdict}
        redFlags={response.red_flags}
        links={response.links}
        language={resultData.language || language}
        mode={mode}
      />

      {/* Feedback row */}
      <GlassCard className="p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[18px] font-bold text-[#F4F6FF]">
          {feedbackSent ? t.result.feedbackThanks : t.result.feedbackPrompt}
        </p>

        {!feedbackSent && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => void handleFeedback(true)}
              className="min-h-[48px] px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-[#4CF2B0]/20 border border-white/15 text-[#F4F6FF] font-bold inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ThumbsUp className="w-4 h-4 text-[#4CF2B0]" />
              <span>{t.result.feedbackYes}</span>
            </button>
            <button
              type="button"
              onClick={() => void handleFeedback(false)}
              className="min-h-[48px] px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-[#FF5C8A]/20 border border-white/15 text-[#F4F6FF] font-bold inline-flex items-center gap-2 cursor-pointer transition-colors"
            >
              <ThumbsDown className="w-4 h-4 text-[#FF5C8A]" />
              <span>{t.result.feedbackNo}</span>
            </button>
          </div>
        )}
      </GlassCard>

      {/* Emergency SOS Pink Card */}
      <GlassCard className="p-6 sm:p-7 border-[#FF5C8A]/45 bg-[#FF5C8A]/[0.07]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <h2 className="font-heading font-extrabold text-[22px] text-[#FFD2DF] flex items-center gap-2.5">
              <LifeBuoy className="w-6 h-6 text-[#FF5C8A] shrink-0" />
              <span>{t.result.emergencyCardTitle}</span>
            </h2>
            <p className="text-[18px] text-[#F4F6FF]/85">
              {t.result.emergencyCardDesc}
            </p>
          </div>
          <Link to="/help" className="w-full sm:w-auto shrink-0">
            <GradientButton variant="danger" className="w-full sm:w-auto">
              <span>{t.result.emergencyCardBtn}</span>
              <ArrowRight className="w-5 h-5" />
            </GradientButton>
          </Link>
        </div>
      </GlassCard>

      {/* Bottom actions & disclaimer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <Link to="/check" className="w-full sm:w-auto">
          <GradientButton variant="ghost" className="w-full sm:w-auto">
            <span>{t.result.checkAnother}</span>
          </GradientButton>
        </Link>

        <Link
          to="/report"
          className="min-h-[44px] inline-flex items-center gap-2 text-[17px] font-bold text-[#3DE0FF] hover:underline"
        >
          <span>{t.result.reportLink}</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-center text-[15px] text-[#A9B1D6] pt-2">
        {t.result.disclaimer}
      </p>
    </div>
  );
}
