import { useState } from 'react';
import {
  Briefcase,
  CreditCard,
  Eye,
  Gift,
  Landmark,
  Package,
  QrCode,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Chip } from '../components/Chip';
import { GlassCard } from '../components/GlassCard';
import { HighlightedMessage } from '../components/HighlightedMessage';
import { ReasonCard } from '../components/ReasonCard';
import { useAppContext } from '../context/ResultContext';
import {
  SCAM_GUIDE_ITEMS,
  type ScamCategoryId,
  type ScamGuideItem,
} from '../data/scams';

const CATEGORY_ICONS: Record<ScamCategoryId, typeof Landmark> = {
  kyc: Landmark,
  parcel: Package,
  job: Briefcase,
  lottery: Gift,
  upi_collect: CreditCard,
  fake_qr: QrCode,
  electricity: Zap,
};

export default function Guide() {
  const { language, t, liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  const [selectedFilter, setSelectedFilter] = useState<'all' | ScamCategoryId>('all');
  const [activeModalItem, setActiveModalItem] = useState<ScamGuideItem | null>(null);

  const scamOfWeek = SCAM_GUIDE_ITEMS.find((s) => s.isScamOfWeek) || SCAM_GUIDE_ITEMS[0];
  const filteredItems =
    selectedFilter === 'all'
      ? SCAM_GUIDE_ITEMS
      : SCAM_GUIDE_ITEMS.filter((s) => s.id === selectedFilter);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-heading font-extrabold text-[32px] sm:text-[42px] text-[#F4F6FF] leading-tight">
          {t.guide.title}
        </h1>
        <p className="text-[18px] text-[#A9B1D6]">{t.guide.subtitle}</p>
      </div>

      {/* Glowing Scam of the Week Card */}
      <GlassCard className="p-6 sm:p-7 border-[#3DE0FF]/45 shadow-[0_0_36px_rgba(61,224,255,0.16)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 text-[14px] font-extrabold uppercase tracking-wider text-[#3DE0FF]">
              <Sparkles className="w-4 h-4" />
              <span>{t.guide.scamOfWeekBadge}</span>
            </span>
            <h2 className="font-heading font-extrabold text-[24px] text-[#F4F6FF]">
              {scamOfWeek.title[language]}
            </h2>
            <p className="text-[18px] text-[#F4F6FF]/85 max-w-2xl">
              {scamOfWeek.warning[language]}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveModalItem(scamOfWeek)}
            className="min-h-[48px] px-5 py-2.5 rounded-full bg-[#3DE0FF] text-[#0A0F24] font-extrabold text-[16px] inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer hover:opacity-95 transition-opacity"
          >
            <Eye className="w-4 h-4" />
            <span>{t.guide.seeExample}</span>
          </button>
        </div>
      </GlassCard>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-2.5">
        <Chip
          label={t.guide.allFilter}
          active={selectedFilter === 'all'}
          onClick={() => setSelectedFilter('all')}
        />
        {SCAM_GUIDE_ITEMS.map((item) => (
          <Chip
            key={item.id}
            label={item.title[language]}
            active={selectedFilter === item.id}
            onClick={() => setSelectedFilter(item.id)}
          />
        ))}
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const Icon = CATEGORY_ICONS[item.id];
          return (
            <GlassCard
              key={item.id}
              interactive
              className="p-6 flex flex-col justify-between gap-5"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#7C6CFF]/18 border border-[#7C6CFF]/40 text-[#B8AEFF] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="font-heading font-bold text-[21px] text-[#F4F6FF]">
                  {item.title[language]}
                </h2>
                <p className="text-[18px] text-[#A9B1D6] mt-2 leading-relaxed">
                  {item.warning[language]}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalItem(item)}
                className="min-h-[48px] px-4 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-[#F4F6FF] font-bold text-[16px] inline-flex items-center justify-center gap-2 cursor-pointer transition-colors w-full"
              >
                <Eye className="w-4 h-4 text-[#3DE0FF]" />
                <span>{t.guide.seeExample}</span>
              </button>
            </GlassCard>
          );
        })}
      </div>

      {/* Animated Modal with HighlightedMessage */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveModalItem(null)}
            className="fixed inset-0 z-[80] bg-[#070B1A]/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeModalItem.title[language]}
              initial={
                disableMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 16 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                disableMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.96, y: 10 }
              }
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-surface w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-5 border-[#3DE0FF]/35"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-heading font-extrabold text-[24px] text-[#F4F6FF]">
                  {activeModalItem.title[language]}
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  aria-label={t.guide.closeModal}
                  className="min-h-[44px] min-w-[44px] rounded-full bg-white/10 hover:bg-white/20 text-[#F4F6FF] inline-flex items-center justify-center cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-bold text-[17px] text-[#3DE0FF]">
                  {t.guide.exampleMessageTitle}
                </h3>
                <HighlightedMessage
                  message={activeModalItem.sampleMessage}
                  redFlags={activeModalItem.redFlags}
                  links={activeModalItem.links}
                  verdict="likely_scam"
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-heading font-bold text-[17px] text-[#FF9BB8]">
                  {t.guide.whyFakeTitle}
                </h3>
                {activeModalItem.redFlags.map((flag, i) => (
                  <ReasonCard
                    key={flag.type}
                    index={i + 1}
                    flag={flag}
                    verdict="likely_scam"
                  />
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="min-h-[48px] px-6 rounded-full bg-white/10 hover:bg-white/20 text-[#F4F6FF] font-bold text-[16px] cursor-pointer"
                >
                  {t.guide.closeModal}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
