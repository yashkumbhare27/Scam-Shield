import { useState } from 'react';
import { ArrowLeft, PhoneCall } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { GradientButton } from '../components/GradientButton';
import { Pip } from '../components/Pip';
import { StepCard } from '../components/StepCard';
import { useAppContext } from '../context/ResultContext';
import {
  EMERGENCY_CONTACTS,
  EMERGENCY_FLOWS,
  type EmergencyType,
} from '../data/emergency';

function isEmergencyType(value: string | undefined): value is EmergencyType {
  return (
    value === 'link' ||
    value === 'otp' ||
    value === 'app' ||
    value === 'money'
  );
}

export default function HelpSteps() {
  const { type } = useParams<{ type: string }>();
  const { language, t } = useAppContext();

  const [stepIndex, setStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [justCompletedTick, setJustCompletedTick] = useState(false);

  if (!isEmergencyType(type)) {
    return <Navigate to="/help" replace />;
  }

  const steps = EMERGENCY_FLOWS[type];
  const currentStep = steps[stepIndex];

  const flowTitleMap: Record<EmergencyType, string> = {
    link: t.help.cards.linkTitle,
    otp: t.help.cards.otpTitle,
    app: t.help.cards.appTitle,
    money: t.help.cards.moneyTitle,
  };

  const handleNext = () => {
    setJustCompletedTick(true);
    window.setTimeout(() => {
      setJustCompletedTick(false);
      if (stepIndex + 1 >= steps.length) {
        setCompleted(true);
      } else {
        setStepIndex((i) => i + 1);
      }
    }, 180);
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          to="/help"
          className="min-h-[44px] inline-flex items-center gap-2 text-[17px] font-bold text-[#3DE0FF] hover:underline"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{flowTitleMap[type]}</span>
        </Link>
        <span className="text-[14px] font-bold text-[#A9B1D6]">
          {t.help.lastChecked} ({EMERGENCY_CONTACTS.lastChecked[language]})
        </span>
      </div>

      {completed ? (
        <GlassCard className="p-7 sm:p-10 text-center space-y-5 border-[#4CF2B0]/45">
          <div className="flex justify-center">
            <Pip mood="celebrating" size={156} />
          </div>
          <h1 className="font-heading font-extrabold text-[30px] sm:text-[36px] text-[#F4F6FF]">
            {t.help.doneTitle}
          </h1>
          <p className="text-[19px] text-[#A9B1D6] max-w-lg mx-auto leading-relaxed">
            {t.help.doneDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <Link to="/report" className="w-full sm:w-auto">
              <GradientButton variant="primary" className="w-full sm:w-auto">
                <PhoneCall className="w-5 h-5" />
                <span>{t.help.doneReportBtn}</span>
              </GradientButton>
            </Link>
            <Link to="/" className="w-full sm:w-auto">
              <GradientButton variant="ghost" className="w-full sm:w-auto">
                <span>{t.help.doneHomeBtn}</span>
              </GradientButton>
            </Link>
          </div>
        </GlassCard>
      ) : (
        <AnimatePresence mode="wait">
          <StepCard
            key={stepIndex}
            step={currentStep}
            stepNumber={stepIndex + 1}
            totalSteps={steps.length}
            onNext={handleNext}
            onPrev={handlePrev}
            justCompleted={justCompletedTick}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
