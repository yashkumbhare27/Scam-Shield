import { createHash } from 'node:crypto';
import type { AnalyzeResponse, CheckMode, Language } from '../../src/types.ts';

interface CacheEntry {
  value: AnalyzeResponse;
  expiresAt: number;
}

const TTL_MS = 10 * 60 * 1000;
const MAX_ENTRIES = 500;
const store = new Map<string, CacheEntry>();

export function buildCacheKey(
  text: string | null,
  imageBase64: string | null,
  language: Language,
  mode: CheckMode,
): string {
  const normalizedText = (text || '').trim().toLowerCase().replace(/\s+/g, ' ');
  const imageHash = imageBase64
    ? createHash('sha256').update(imageBase64).digest('hex')
    : '';
  return createHash('sha256')
    .update(`${normalizedText}|${imageHash}|${language}|${mode}`)
    .digest('hex');
}

export function getCachedResult(key: string): AnalyzeResponse | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value;
}

export function setCachedResult(key: string, value: AnalyzeResponse): void {
  if (store.size >= MAX_ENTRIES) {
    const oldestKey = store.keys().next().value;
    if (oldestKey) {
      store.delete(oldestKey);
    }
  }
  store.set(key, {
    value,
    expiresAt: Date.now() + TTL_MS,
  });
}
