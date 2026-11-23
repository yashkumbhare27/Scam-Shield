import { ArrowRight, LockKeyhole, ShieldCheck, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { GradientButton } from '../components/GradientButton';
import { LiteModeToggle } from '../components/LiteModeToggle';
import { Pip } from '../components/Pip';
import { useAppContext } from '../context/ResultContext';

export default function About() {
  const { t } = useAppContext();

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <Pip mood="happy" size={116} />
        <div>
          <h1 className="font-heading font-extrabold text-[32px] sm:text-[42px] text-[#F4F6FF] leading-tight">
            {t.about.title}
          </h1>
        </div>
      </div>

      {/* Human Story */}
      <GlassCard className="p-6 sm:p-8 space-y-3">
        <h2 className="font-heading font-extrabold text-[23px] text-[#3DE0FF]">
          {t.about.storyTitle}
        </h2>
        <p className="text-[19px] text-[#F4F6FF]/90 leading-relaxed">
          {t.about.storyBody}
        </p>
      </GlassCard>

      {/* Three-step explainer */}
      <section className="space-y-4">
        <h2 className="font-heading font-extrabold text-[24px] text-[#F4F6FF]">
          {t.about.howTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.about.howItems.map((item, idx) => (
            <GlassCard key={idx} className="p-5 space-y-2">
              <span className="font-heading font-extrabold text-[16px] text-[#3DE0FF] tabular-nums">
                0{idx + 1}
              </span>
              <h3 className="font-heading font-bold text-[19px] text-[#F4F6FF]">
                {item.title}
              </h3>
              <p className="text-[17px] text-[#A9B1D6] leading-relaxed">
                {item.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Privacy Card */}
      <GlassCard className="p-6 sm:p-8 space-y-5 border-[#3DE0FF]/35">
        <h2 className="font-heading font-extrabold text-[23px] text-[#F4F6FF]">
          {t.about.privacyTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {t.about.privacyItems.map((p, idx) => {
            const Icon =
              idx === 0 ? LockKeyhole : idx === 1 ? UserCheck : ShieldCheck;
            return (
              <div key={idx} className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-[#3DE0FF]/15 border border-[#3DE0FF]/35 text-[#3DE0FF] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-[18px] text-[#F4F6FF]">
                  {p.title}
                </h3>
                <p className="text-[16px] text-[#A9B1D6] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Actions & Disclaimer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/report" className="w-full sm:w-auto">
          <GradientButton variant="primary" className="w-full sm:w-auto">
            <span>{t.about.reportBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </GradientButton>
        </Link>
        <LiteModeToggle />
      </div>

      <div className="pt-3 border-t border-white/10 text-center space-y-2 text-[15px] text-[#A9B1D6]">
        <p>{t.about.disclaimer}</p>
        <p>{t.about.credit}</p>
      </div>
    </div>
  );
}
