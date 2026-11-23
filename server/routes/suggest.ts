import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import type { CheckMode, Language, SuggestRequest, Verdict } from '../../src/types.ts';
import { generateAiSuggestions } from '../services/chat.ts';
import { rateLimitAnalyze } from '../services/rateLimit.ts';

export const suggestRouter = Router();

const VALID_LANGUAGES = new Set<Language>(['en', 'hi', 'mr']);
const VALID_VERDICTS = new Set<Verdict>(['likely_scam', 'suspicious', 'no_red_flags']);
const VALID_MODES = new Set<CheckMode>(['self', 'parent']);

suggestRouter.post('/suggest', rateLimitAnalyze, async (req, res) => {
  const requestId = randomUUID();
  const startedAt = Date.now();
  const body = req.body as Partial<SuggestRequest> | undefined;

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    res.status(400).json({ error: 'Invalid suggestion request.' });
    return;
  }

  const verdict: Verdict = VALID_VERDICTS.has(body.verdict as Verdict)
    ? (body.verdict as Verdict)
    : 'suspicious';
  const language: Language = VALID_LANGUAGES.has(body.language as Language)
    ? (body.language as Language)
    : 'en';
  const mode: CheckMode = VALID_MODES.has(body.mode as CheckMode)
    ? (body.mode as CheckMode)
    : 'self';

  const safeFlags = Array.isArray(body.red_flags)
    ? body.red_flags
        .filter((f) => f && typeof f.type === 'string')
        .slice(0, 8)
        .map((f) => ({
          type: f.type.slice(0, 80),
          evidence: '',
          explanation: '',
        }))
    : [];

  const safeLinks = Array.isArray(body.links)
    ? body.links
        .filter((l) => l && typeof l.risk === 'string')
        .slice(0, 6)
        .map((l) => ({
          url: '',
          risk: l.risk,
          reason: '',
        }))
    : [];

  const { data, source } = await generateAiSuggestions({
    verdict,
    red_flags: safeFlags,
    links: safeLinks,
    language,
    mode,
  });

  console.info(
    JSON.stringify({
      event: 'suggest',
      requestId,
      verdict,
      language,
      latencyMs: Date.now() - startedAt,
      source,
    }),
  );

  res.json(data);
});
