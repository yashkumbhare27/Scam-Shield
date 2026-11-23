import { useEffect, useState } from 'react';
import { Check, Copy, MessageCircleHeart, Sparkles } from 'lucide-react';
import { fetchAiSuggestions } from '../api';
import { useAppContext } from '../context/ResultContext';
import type {
  CheckMode,
  Language,
  LinkFinding,
  RedFlag,
  SuggestResponse,
  Verdict,
} from '../types';
import { GlassCard } from './GlassCard';

interface AISuggestionsProps {
  verdict: Verdict;
  redFlags: RedFlag[];
  links: LinkFinding[];
  language: Language;
  mode: CheckMode;
}

export function AISuggestions({
  verdict,
  redFlags,
  links,
  language,
  mode,
}: AISuggestionsProps) {
  const { t, openChat } = useAppContext();
  const [data, setData] = useState<SuggestResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchAiSuggestions({
      verdict,
      red_flags: redFlags,
      links,
      language,
      mode,
    })
      .then((res) => {
        if (active) setData(res);
      })
      .catch(() => {
        // Gracefully stay silent if unavailable
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [verdict, redFlags, links, language, mode]);

  const handleCopyFamilyMessage = async () => {
    if (!data?.family_message) return;
    try {
      await navigator.clipboard.writeText(data.family_message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // ignore clipboard errors
    }
  };

  if (loading) {
    return (
      <GlassCard className="p-6 border-[#7C6CFF]/35">
        <div className="flex items-center gap-2.5 text-[#B8AEFF] font-heading font-bold text-[18px]">
          <Sparkles className="w-5 h-5 animate-pulse" />
          <span>{t.suggestions.loading}</span>
        </div>
      </GlassCard>
    );
  }

  if (!data) return null;

  return (
    <GlassCard className="p-6 sm:p-7 space-y-5 border-[#7C6CFF]/40">
      <div className="flex items-center gap-2.5 text-[#B8AEFF] font-heading font-extrabold text-[21px]">
        <Sparkles className="w-5 h-5 shrink-0 text-[#3DE0FF]" />
        <h2>{t.suggestions.title}</h2>
      </div>

      {/* Ready-to-copy message for parents/family */}
      <div className="rounded-2xl bg-[#070B1A]/65 border border-white/12 p-4 sm:p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[15px] font-bold text-[#3DE0FF]">
            {t.suggestions.familyLabel}
          </span>
          <button
            type="button"
            onClick={() => void handleCopyFamilyMessage()}
            className="min-h-[40px] px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-[14px] font-bold text-[#F4F6FF] inline-flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#4CF2B0]" />
                <span>{t.suggestions.copiedBtn}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#3DE0FF]" />
                <span>{t.suggestions.copyBtn}</span>
              </>
            )}
          </button>
        </div>
        <p className="text-[18px] text-[#F4F6FF] leading-relaxed">
          “{data.family_message}”
        </p>
      </div>

      {/* Smart AI action tips */}
      <div className="space-y-2.5">
        <h3 className="text-[16px] font-bold text-[#A9B1D6]">
          {t.suggestions.tipsLabel}
        </h3>
        <ul className="space-y-2">
          {data.action_tips.map((tip, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-[18px] text-[#F4F6FF]/90"
            >
              <span
                aria-hidden="true"
                className="w-2 h-2 rounded-full bg-[#3DE0FF] mt-2.5 shrink-0"
              />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Clickable prompts that open Pip AI Chat */}
      <div className="space-y-2.5 pt-2 border-t border-white/10">
        <p className="text-[15px] font-bold text-[#A9B1D6] inline-flex items-center gap-2">
          <MessageCircleHeart className="w-4 h-4 text-[#FF9BD2]" />
          <span>{t.suggestions.askPromptsLabel}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {data.chat_prompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => openChat(prompt)}
              className="min-h-[44px] px-4 py-2 rounded-full bg-[#7C6CFF]/18 hover:bg-[#7C6CFF]/30 border border-[#7C6CFF]/45 text-left text-[15px] font-semibold text-[#F4F6FF] cursor-pointer transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
