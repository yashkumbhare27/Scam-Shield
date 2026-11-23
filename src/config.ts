import type { Language } from './types';

export const APP_CONFIG = {
  appName: 'ScamShield',
  clientTimeoutMs: 20_000,
  maxTextLength: 4000,
  maxImageDimensionPx: 1280,
  imageJpegQuality: 0.8,
  maxImageBytes: 4 * 1024 * 1024,
  contentMaxWidthPx: 1100,
} as const;

export const SPEECH_LANG_MAP: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
};

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;
