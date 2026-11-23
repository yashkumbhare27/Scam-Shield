import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'motion/react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AuroraBackground } from './components/AuroraBackground';
import { Dock } from './components/Dock';
import { Pip } from './components/Pip';
import { PipChatModal } from './components/PipChatModal';
import { TopBar } from './components/TopBar';
import { ResultProvider, useAppContext } from './context/ResultContext';

const Landing = lazy(() => import('./pages/Landing'));
const Check = lazy(() => import('./pages/Check'));
const Result = lazy(() => import('./pages/Result'));
const Help = lazy(() => import('./pages/Help'));
const HelpSteps = lazy(() => import('./pages/HelpSteps'));
const Guide = lazy(() => import('./pages/Guide'));
const Report = lazy(() => import('./pages/Report'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
      <Pip mood="searching" size={110} />
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const { liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  const isHelpScene =
    location.pathname.startsWith('/help') ||
    location.pathname.startsWith('/report');

  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col relative">
      <AuroraBackground calmTint={isHelpScene} />
      <TopBar />

      <main className="relative z-10 flex-1 w-full max-w-[1100px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={disableMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={disableMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<PageLoader />}>
              <Routes location={location}>
                <Route path="/" element={<Landing />} />
                <Route path="/check" element={<Check />} />
                <Route path="/result" element={<Result />} />
                <Route path="/help" element={<Help />} />
                <Route path="/help/:type" element={<HelpSteps />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/report" element={<Report />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      <Dock />
      <PipChatModal />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ResultProvider>
        <HashRouter>
          <ScrollToTop />
          <AppShell />
        </HashRouter>
      </ResultProvider>
    </MotionConfig>
  );
}
