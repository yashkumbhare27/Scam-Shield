import React, { createContext, useContext, useEffect, useState } from 'react';
import { TRANSLATIONS, type Translations } from '../i18n';
import type { AnalyzeResponse, CheckMode, Language } from '../types';

interface StoredResult {
  response: AnalyzeResponse;
  messageText: string;
  mode: CheckMode;
  language: Language;
  hasImage: boolean;
}

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  liteMode: boolean;
  setLiteMode: (enabled: boolean) => void;
  resultData: StoredResult | null;
  setResultData: (data: StoredResult | null) => void;
  isChatOpen: boolean;
  pendingChatPrompt: string | null;
  openChat: (initialPrompt?: string) => void;
  closeChat: () => void;
  clearPendingChatPrompt: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const LANG_STORAGE_KEY = 'scamshield_lang';
const LITE_STORAGE_KEY = 'scamshield_lite_mode';

function getInitialLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'en' || saved === 'hi' || saved === 'mr') {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return 'en';
}

function getInitialLiteMode(): boolean {
  try {
    return window.localStorage.getItem(LITE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function ResultProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [liteMode, setLiteModeState] = useState<boolean>(getInitialLiteMode);
  const [resultData, setResultData] = useState<StoredResult | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [pendingChatPrompt, setPendingChatPrompt] = useState<string | null>(null);

  const openChat = (initialPrompt?: string) => {
    if (initialPrompt && initialPrompt.trim()) {
      setPendingChatPrompt(initialPrompt.trim());
    }
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const clearPendingChatPrompt = () => {
    setPendingChatPrompt(null);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const setLiteMode = (enabled: boolean) => {
    setLiteModeState(enabled);
    try {
      window.localStorage.setItem(LITE_STORAGE_KEY, String(enabled));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (liteMode) {
      document.documentElement.classList.add('lite-mode');
    } else {
      document.documentElement.classList.remove('lite-mode');
    }
  }, [liteMode]);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
        liteMode,
        setLiteMode,
        resultData,
        setResultData,
        isChatOpen,
        pendingChatPrompt,
        openChat,
        closeChat,
        clearPendingChatPrompt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used inside ResultProvider');
  }
  return ctx;
}
