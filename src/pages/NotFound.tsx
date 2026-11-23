import { Link } from 'react-router-dom';
import { GlassCard } from '../components/GlassCard';
import { GradientButton } from '../components/GradientButton';
import { Pip } from '../components/Pip';
import { useAppContext } from '../context/ResultContext';

export default function NotFound() {
  const { t } = useAppContext();

  return (
    <div className="max-w-xl mx-auto pt-8">
      <GlassCard className="p-8 text-center space-y-5">
        <div className="flex justify-center">
          <Pip mood="searching" size={148} />
        </div>
        <h1 className="font-heading font-extrabold text-[28px] sm:text-[34px] text-[#F4F6FF]">
          {t.notFound.title}
        </h1>
        <p className="text-[18px] text-[#A9B1D6] leading-relaxed">
          {t.notFound.desc}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/check" className="w-full sm:w-auto">
            <GradientButton variant="primary" className="w-full sm:w-auto">
              <span>{t.notFound.checkBtn}</span>
            </GradientButton>
          </Link>
          <Link to="/" className="w-full sm:w-auto">
            <GradientButton variant="ghost" className="w-full sm:w-auto">
              <span>{t.notFound.homeBtn}</span>
            </GradientButton>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
