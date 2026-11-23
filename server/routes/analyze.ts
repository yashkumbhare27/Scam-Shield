import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import type {
  AnalyzeRequest,
  AnalyzeResponse,
  CheckMode,
  Language,
  LinkFinding,
  RedFlag,
} from '../../src/types.ts';
import { REPORT_INFO_BY_LANG } from '../config/helplines.ts';
import { buildCacheKey, getCachedResult, setCachedResult } from '../services/cache.ts';
import { buildFallbackResponse } from '../services/fallback.ts';
import { analyzeWithGemini } from '../services/gemini.ts';
import { checkLinks } from '../services/linkChecker.ts';
import { rateLimitAnalyze } from '../services/rateLimit.ts';
import { evaluateRules, maxVerdict } from '../services/rules.ts';

export const analyzeRouter = Router();

const MAX_TEXT_CHARS = 4000;
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const VALID_LANGUAGES = new Set<Language>(['en', 'hi', 'mr']);
const VALID_MODES = new Set<CheckMode>(['self', 'parent']);

function validateAndDecodeImage(raw: string): { ok: true } | { ok: false; error: string } {
  const dataUrlMatch = raw.match(/^data:([^;]+);base64,(.+)$/i);
  let mime = '';
  let base64Body = raw;

  if (dataUrlMatch) {
    mime = dataUrlMatch[1].toLowerCase();
    base64Body = dataUrlMatch[2];
    if (mime !== 'image/jpeg' && mime !== 'image/png' && mime !== 'image/webp') {
      return { ok: false, error: 'Only JPEG, PNG, or WebP screenshots are supported.' };
    }
  } else {
    // Allow raw base64 only if magic bytes match JPEG, PNG, or WebP
    const bufPrefix = Buffer.from(base64Body.slice(0, 24), 'base64');
    const isJpeg = bufPrefix[0] === 0xff && bufPrefix[1] === 0xd8 && bufPrefix[2] === 0xff;
    const isPng =
      bufPrefix[0] === 0x89 &&
      bufPrefix[1] === 0x50 &&
      bufPrefix[2] === 0x4e &&
      bufPrefix[3] === 0x47;
    const isWebp =
      bufPrefix.slice(0, 4).toString('ascii') === 'RIFF' &&
      bufPrefix.slice(8, 12).toString('ascii') === 'WEBP';

    if (!isJpeg && !isPng && !isWebp) {
      return { ok: false, error: 'Only JPEG, PNG, or WebP screenshots are supported.' };
    }
  }

  const decodedBytes = Buffer.byteLength(base64Body, 'base64');
  if (decodedBytes === 0 || decodedBytes > MAX_IMAGE_BYTES) {
    return { ok: false, error: 'Screenshot must be smaller than 4 MB.' };
  }

  return { ok: true };
}

function mergeFlags(geminiFlags: RedFlag[], ruleFlags: RedFlag[]): RedFlag[] {
  const merged = [...geminiFlags];
  for (const rf of ruleFlags) {
    const alreadyCovered = merged.some(
      (gf) =>
        (rf.evidence &&
          gf.evidence &&
          gf.evidence.toLowerCase().includes(rf.evidence.toLowerCase())) ||
        gf.type.toLowerCase() === rf.type.toLowerCase(),
    );
    if (!alreadyCovered) {
      merged.push(rf);
    }
  }
  return merged;
}

analyzeRouter.post('/analyze', rateLimitAnalyze, async (req, res) => {
  const requestId = randomUUID();
  const startedAt = Date.now();

  const body = req.body as Partial<AnalyzeRequest> | undefined;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    res.status(400).json({ error: 'Invalid request payload.' });
    return;
  }

  const text = typeof body.text === 'string' ? body.text.trim() : null;
  const imageBase64 =
    typeof body.image_base64 === 'string' && body.image_base64.trim()
      ? body.image_base64.trim()
      : null;

  const language: Language = VALID_LANGUAGES.has(body.language as Language)
    ? (body.language as Language)
    : 'en';
  const mode: CheckMode = VALID_MODES.has(body.mode as CheckMode)
    ? (body.mode as CheckMode)
    : 'self';

  if (!text && !imageBase64) {
    res.status(400).json({ error: 'Please provide message text or a screenshot.' });
    return;
  }

  if (text && text.length > MAX_TEXT_CHARS) {
    res
      .status(400)
      .json({ error: 'Message text must be 4,000 characters or fewer.' });
    return;
  }

  if (imageBase64) {
    const imgCheck = validateAndDecodeImage(imageBase64);
    if (!imgCheck.ok) {
      res.status(400).json({ error: imgCheck.error });
      return;
    }
  }

  // Check cache
  const cacheKey = buildCacheKey(text, imageBase64, language, mode);
  const cached = getCachedResult(cacheKey);
  if (cached) {
    console.info(
      JSON.stringify({
        requestId,
        verdict: cached.verdict,
        language,
        latencyMs: Date.now() - startedAt,
        source: 'cache',
      }),
    );
    res.json(cached);
    return;
  }

  // Run deterministic link checker on provided text
  let links: LinkFinding[] = text ? checkLinks(text, language) : [];

  try {
    const geminiResult = await analyzeWithGemini({
      text,
      imageBase64,
      language,
      mode,
      links,
    });

    const effectiveText = text || geminiResult.extracted_text || '';
    if (!text && effectiveText) {
      links = checkLinks(effectiveText, language);
    }

    const rulesEval = evaluateRules(effectiveText, links, language);
    const finalVerdict = maxVerdict(geminiResult.verdict, rulesEval.minVerdict);
    const combinedFlags = mergeFlags(geminiResult.red_flags, rulesEval.ruleFlags);

    const fallbackTemplate = buildFallbackResponse({
      text: effectiveText,
      hasImage: Boolean(imageBase64),
      links,
      language,
      mode,
    });

    const finalResponse: AnalyzeResponse = {
      verdict: finalVerdict,
      confidence:
        finalVerdict !== geminiResult.verdict ? 'high' : geminiResult.confidence,
      red_flags: combinedFlags,
      links,
      next_steps:
        geminiResult.next_steps.length === 3
          ? geminiResult.next_steps
          : fallbackTemplate.next_steps,
      report_info: REPORT_INFO_BY_LANG[language],
      simple_explanation:
        geminiResult.simple_explanation || fallbackTemplate.simple_explanation,
      spoken_text: geminiResult.spoken_text || fallbackTemplate.spoken_text,
      ...(imageBase64 && !text && geminiResult.extracted_text
        ? { extracted_text: geminiResult.extracted_text }
        : {}),
    };

    setCachedResult(cacheKey, finalResponse);

    console.info(
      JSON.stringify({
        requestId,
        verdict: finalResponse.verdict,
        language,
        latencyMs: Date.now() - startedAt,
        source: 'gemini',
      }),
    );

    res.json(finalResponse);
  } catch (err) {
    const errorType = err instanceof Error ? err.message : 'UNKNOWN_ERROR';
    const fallbackResponse = buildFallbackResponse({
      text,
      hasImage: Boolean(imageBase64),
      links,
      language,
      mode,
    });

    console.warn(
      JSON.stringify({
        requestId,
        verdict: fallbackResponse.verdict,
        language,
        latencyMs: Date.now() - startedAt,
        source: 'fallback',
        errorType,
      }),
    );

    res.json(fallbackResponse);
  }
});
