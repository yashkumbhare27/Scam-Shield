import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import type { FeedbackRequest } from '../../src/types.ts';

export const feedbackRouter = Router();

const ALLOWED_KEYS = new Set(['verdict', 'was_correct', 'language']);
const VALID_VERDICTS = new Set(['likely_scam', 'suspicious', 'no_red_flags']);
const VALID_LANGUAGES = new Set(['en', 'hi', 'mr']);

feedbackRouter.post('/feedback', (req, res) => {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    res.status(400).json({ error: 'Invalid request body.' });
    return;
  }

  const keys = Object.keys(body);
  if (keys.some((k) => !ALLOWED_KEYS.has(k))) {
    res.status(400).json({ error: 'Unexpected fields in feedback payload.' });
    return;
  }

  const { verdict, was_correct, language } = body as Partial<FeedbackRequest>;

  if (
    typeof verdict !== 'string' ||
    !VALID_VERDICTS.has(verdict) ||
    typeof was_correct !== 'boolean' ||
    typeof language !== 'string' ||
    !VALID_LANGUAGES.has(language)
  ) {
    res.status(400).json({ error: 'Invalid feedback fields.' });
    return;
  }

  const requestId = randomUUID();
  console.info(
    JSON.stringify({
      event: 'feedback',
      requestId,
      verdict,
      was_correct,
      language,
    }),
  );

  res.status(200).json({ ok: true });
});
