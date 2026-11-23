import { randomUUID } from 'node:crypto';
import { Router } from 'express';
import type { ChatMessage, ChatRequest, Language } from '../../src/types.ts';
import { generateChatReply } from '../services/chat.ts';
import { rateLimitAnalyze } from '../services/rateLimit.ts';

export const chatRouter = Router();

const VALID_LANGUAGES = new Set<Language>(['en', 'hi', 'mr']);
const MAX_TURNS = 12;
const MAX_MSG_CHARS = 1500;

chatRouter.post('/chat', rateLimitAnalyze, async (req, res) => {
  const requestId = randomUUID();
  const startedAt = Date.now();
  const body = req.body as Partial<ChatRequest> | undefined;

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    res.status(400).json({ error: 'Invalid chat request body.' });
    return;
  }

  const language: Language = VALID_LANGUAGES.has(body.language as Language)
    ? (body.language as Language)
    : 'en';

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    res.status(400).json({ error: 'Please send a message to Pip.' });
    return;
  }

  const sanitizedMessages: ChatMessage[] = [];
  for (const m of body.messages.slice(-MAX_TURNS)) {
    if (
      !m ||
      typeof m !== 'object' ||
      (m.role !== 'user' && m.role !== 'model') ||
      typeof m.text !== 'string'
    ) {
      res.status(400).json({ error: 'Invalid message format.' });
      return;
    }
    const trimmed = m.text.trim();
    if (!trimmed) continue;
    if (trimmed.length > MAX_MSG_CHARS) {
      res.status(400).json({ error: 'Chat message is too long (max 1,500 characters).' });
      return;
    }
    sanitizedMessages.push({ role: m.role, text: trimmed });
  }

  if (sanitizedMessages.length === 0) {
    res.status(400).json({ error: 'Please send a non-empty message.' });
    return;
  }

  const sanitizedContext =
    body.context && typeof body.context === 'object'
      ? {
          verdict: body.context.verdict,
          red_flag_types: Array.isArray(body.context.red_flag_types)
            ? body.context.red_flag_types
                .filter((s): s is string => typeof s === 'string')
                .slice(0, 8)
            : undefined,
          link_risks: Array.isArray(body.context.link_risks)
            ? body.context.link_risks
                .filter((s): s is string => typeof s === 'string')
                .slice(0, 6)
            : undefined,
          mode: body.context.mode,
        }
      : undefined;

  const { data, source } = await generateChatReply({
    messages: sanitizedMessages,
    language,
    context: sanitizedContext,
  });

  console.info(
    JSON.stringify({
      event: 'chat',
      requestId,
      language,
      turnCount: sanitizedMessages.length,
      latencyMs: Date.now() - startedAt,
      source,
    }),
  );

  res.json(data);
});
