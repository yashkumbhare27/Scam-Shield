import { useState } from 'react';
import {
  Building2,
  Check,
  ExternalLink,
  Globe,
  PhoneCall,
  Smartphone,
} from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { Pip } from '../components/Pip';
import { useAppContext } from '../context/ResultContext';
import { EMERGENCY_CONTACTS } from '../data/emergency';

export default function Report() {
  const { language, t } = useAppContext();
  const [checkedEvidence, setCheckedEvidence] = useState<Record<number, boolean>>({});

  const toggleEvidence = (idx: number) => {
    setCheckedEvidence((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <Pip mood="calm" size={112} />
        <div className="space-y-2">
          <span className="inline-block text-[14px] font-bold text-[#3DE0FF]">
            {t.report.lastChecked} ({EMERGENCY_CONTACTS.lastChecked[language]})
          </span>
          <h1 className="font-heading font-extrabold text-[32px] sm:text-[40px] text-[#F4F6FF] leading-tight">
            {t.report.title}
          </h1>
          <p className="text-[18px] text-[#A9B1D6]">{t.report.subtitle}</p>
        </div>
      </div>

      {/* Primary official reporting cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <GlassCard className="p-6 flex flex-col justify-between gap-5 border-[#4CF2B0]/40">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#4CF2B0]/15 border border-[#4CF2B0]/40 text-[#4CF2B0] flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-extrabold text-[22px] text-[#F4F6FF]">
              {t.report.helplineLabel}
            </h2>
            <p className="font-heading font-extrabold text-[34px] text-[#4CF2B0] mt-2 tabular-nums">
              {EMERGENCY_CONTACTS.cybercrimeHelpline}
            </p>
          </div>

          <a
            href={`tel:${EMERGENCY_CONTACTS.cybercrimeHelpline}`}
            className="min-h-[52px] px-5 py-3 rounded-full bg-[#4CF2B0] text-[#0A0F24] font-extrabold text-[17px] inline-flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
          >
            <PhoneCall className="w-5 h-5" />
            <span>{t.report.callBtn}</span>
          </a>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col justify-between gap-5 border-[#3DE0FF]/40">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#3DE0FF]/15 border border-[#3DE0FF]/40 text-[#3DE0FF] flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-extrabold text-[22px] text-[#F4F6FF]">
              {t.report.portalLabel}
            </h2>
            <p className="font-mono-msg text-[17px] text-[#3DE0FF] mt-2 break-all">
              {EMERGENCY_CONTACTS.cybercrimePortalLabel}
            </p>
          </div>

          <a
            href={EMERGENCY_CONTACTS.cybercrimePortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[52px] px-5 py-3 rounded-full bg-[#3DE0FF]/20 border border-[#3DE0FF]/55 text-[#F4F6FF] font-extrabold text-[17px] inline-flex items-center justify-center gap-2 hover:bg-[#3DE0FF]/30 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>{t.report.openBtn}</span>
          </a>
        </GlassCard>

        <GlassCard className="p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#7C6CFF]/18 border border-[#7C6CFF]/40 text-[#B8AEFF] flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-[20px] text-[#F4F6FF]">
            {t.report.bankLabel}
          </h2>
          <p className="text-[18px] text-[#A9B1D6] leading-relaxed">
            {t.report.bankDesc}
          </p>
        </GlassCard>

        <GlassCard className="p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FF9BD2]/15 border border-[#FF9BD2]/40 text-[#FF9BD2] flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-[20px] text-[#F4F6FF]">
            {t.report.upiLabel}
          </h2>
          <p className="text-[18px] text-[#A9B1D6] leading-relaxed">
            {t.report.upiDesc}
          </p>
        </GlassCard>
      </div>

      {/* Keep as evidence interactive checklist */}
      <section className="space-y-3">
        <h2 className="font-heading font-extrabold text-[24px] text-[#F4F6FF]">
          {t.report.evidenceTitle}
        </h2>
        <p className="text-[18px] text-[#A9B1D6]">{t.report.evidenceSubtitle}</p>

        <div className="space-y-3 pt-1">
          {t.report.evidenceItems.map((item, idx) => {
            const checked = Boolean(checkedEvidence[idx]);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleEvidence(idx)}
                aria-pressed={checked}
                className={`w-full text-left glass-surface p-5 min-h-[60px] flex items-center gap-4 transition-colors cursor-pointer ${
                  checked
                    ? 'border-[#4CF2B0]/50 bg-[#4CF2B0]/10'
                    : 'hover:bg-white/[0.09]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    checked
                      ? 'bg-[#4CF2B0] border-[#4CF2B0] text-[#0A0F24]'
                      : 'border-white/30 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </span>
                <span className="text-[18px] font-semibold text-[#F4F6FF]">
                  {item}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
