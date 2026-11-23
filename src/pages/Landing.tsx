import { ArrowRight, Globe, Link2Off, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DemoCard } from '../components/DemoCard';
import { GlassCard } from '../components/GlassCard';
import { GradientButton } from '../components/GradientButton';
import { LiteModeToggle } from '../components/LiteModeToggle';
import { Pip } from '../components/Pip';
import { useAppContext } from '../context/ResultContext';

export default function Landing() {
  const { t } = useAppContext();

  return (
    <div className="space-y-12 sm:space-y-14">
      {/* Hero */}
      <section className="pt-4 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <h1 className="hero-display">
            {t.landing.headlineBefore}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'var(--gradient-primary)' }}
            >
              {t.landing.headlineGlow}
            </span>
            {t.landing.headlineAfter}
          </h1>

          <p className="text-[19px] sm:text-[21px] text-[#A9B1D6] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            {t.landing.subhead}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-2">
            <Link to="/check" className="w-full sm:w-auto">
              <GradientButton variant="primary" className="w-full sm:w-auto">
                <span>{t.landing.ctaCheck}</span>
                <ArrowRight className="w-5 h-5" />
              </GradientButton>
            </Link>
            <Link to="/help" className="w-full sm:w-auto">
              <GradientButton variant="danger" className="w-full sm:w-auto">
                <span>{t.landing.ctaHelp}</span>
              </GradientButton>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center gap-4">
          <Pip mood="happy" size={172} />
          <div className="w-full max-w-md">
            <DemoCard />
          </div>
        </div>
      </section>

      {/* Three glass feature cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <GlassCard className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-[#3DE0FF]/15 border border-[#3DE0FF]/35 text-[#3DE0FF] flex items-center justify-center mb-4">
            <Link2Off className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-[20px] text-[#F4F6FF]">
            {t.landing.features.linksTitle}
          </h2>
          <p className="text-[18px] text-[#A9B1D6] mt-2 leading-relaxed">
            {t.landing.features.linksDesc}
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-[#7C6CFF]/15 border border-[#7C6CFF]/40 text-[#B8AEFF] flex items-center justify-center mb-4">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-[20px] text-[#F4F6FF]">
            {t.landing.features.langTitle}
          </h2>
          <p className="text-[18px] text-[#A9B1D6] mt-2 leading-relaxed">
            {t.landing.features.langDesc}
          </p>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FF9BD2]/15 border border-[#FF9BD2]/35 text-[#FF9BD2] flex items-center justify-center mb-4">
            <LockKeyhole className="w-6 h-6" />
          </div>
          <h2 className="font-heading font-bold text-[20px] text-[#F4F6FF]">
            {t.landing.features.privacyTitle}
          </h2>
          <p className="text-[18px] text-[#A9B1D6] mt-2 leading-relaxed">
            {t.landing.features.privacyDesc}
          </p>
        </GlassCard>
      </section>

      {/* Compact 3-step How it works */}
      <section className="space-y-5">
        <h2 className="font-heading font-extrabold text-[26px] sm:text-[30px] text-[#F4F6FF]">
          {t.landing.howTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <GlassCard className="p-6">
            <h3 className="font-heading font-bold text-[19px] text-[#3DE0FF]">
              {t.landing.howSteps.step1Title}
            </h3>
            <p className="text-[18px] text-[#A9B1D6] mt-2">
              {t.landing.howSteps.step1Desc}
            </p>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="font-heading font-bold text-[19px] text-[#3DE0FF]">
              {t.landing.howSteps.step2Title}
            </h3>
            <p className="text-[18px] text-[#A9B1D6] mt-2">
              {t.landing.howSteps.step2Desc}
            </p>
          </GlassCard>
          <GlassCard className="p-6">
            <h3 className="font-heading font-bold text-[19px] text-[#3DE0FF]">
              {t.landing.howSteps.step3Title}
            </h3>
            <p className="text-[18px] text-[#A9B1D6] mt-2">
              {t.landing.howSteps.step3Desc}
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[15px] text-[#A9B1D6]">
        <p>{t.landing.footerCredit}</p>
        <LiteModeToggle />
      </footer>
    </div>
  );
}
