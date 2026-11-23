import { ArrowRight, IndianRupee, KeyRound, Link2, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { Pip } from '../components/Pip';
import { useAppContext } from '../context/ResultContext';
import { EMERGENCY_CONTACTS, type EmergencyType } from '../data/emergency';

export default function Help() {
  const { language, t } = useAppContext();

  const options: {
    type: EmergencyType;
    title: string;
    desc: string;
    icon: typeof Link2;
    accent: string;
  }[] = [
    {
      type: 'link',
      title: t.help.cards.linkTitle,
      desc: t.help.cards.linkDesc,
      icon: Link2,
      accent: '#3DE0FF',
    },
    {
      type: 'otp',
      title: t.help.cards.otpTitle,
      desc: t.help.cards.otpDesc,
      icon: KeyRound,
      accent: '#FFC24D',
    },
    {
      type: 'app',
      title: t.help.cards.appTitle,
      desc: t.help.cards.appDesc,
      icon: Smartphone,
      accent: '#7C6CFF',
    },
    {
      type: 'money',
      title: t.help.cards.moneyTitle,
      desc: t.help.cards.moneyDesc,
      icon: IndianRupee,
      accent: '#FF5C8A',
    },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <Pip mood="calm" size={124} />
        <div className="space-y-2">
          <span className="inline-block text-[14px] font-bold text-[#3DE0FF]">
            {t.help.lastChecked} ({EMERGENCY_CONTACTS.lastChecked[language]})
          </span>
          <h1 className="font-heading font-extrabold text-[30px] sm:text-[40px] text-[#F4F6FF] leading-tight">
            {t.help.title}
          </h1>
          <p className="text-[18px] text-[#A9B1D6]">{t.help.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <Link key={opt.type} to={`/help/${opt.type}`} className="block">
              <GlassCard
                interactive
                className="h-full p-6 sm:p-7 flex flex-col justify-between gap-4 border-[#3DE0FF]/25 hover:border-[#3DE0FF]/55"
              >
                <div>
                  <div
                    style={{
                      backgroundColor: `${opt.accent}1F`,
                      borderColor: `${opt.accent}55`,
                      color: opt.accent,
                    }}
                    className="w-12 h-12 rounded-2xl border flex items-center justify-center mb-4"
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="font-heading font-extrabold text-[22px] text-[#F4F6FF]">
                    {opt.title}
                  </h2>
                  <p className="text-[18px] text-[#A9B1D6] mt-2 leading-relaxed">
                    {opt.desc}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-[16px] font-bold text-[#3DE0FF]">
                  <span>{EMERGENCY_CONTACTS.cybercrimeHelpline}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
