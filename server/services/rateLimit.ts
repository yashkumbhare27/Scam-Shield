import type { NextFunction, Request, Response } from 'express';

interface WindowCounter {
  count: number;
  resetAt: number;
}

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const buckets = new Map<string, WindowCounter>();

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.ip || req.socket.remoteAddress || 'unknown';
}

export function rateLimitAnalyze(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const ip = getClientIp(req);
  const now = Date.now();
  const existing = buckets.get(ip);

  if (!existing || now > existing.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    next();
    return;
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({
      error: 'Too many checks right now. Please wait a minute and try again.',
    });
    return;
  }

  existing.count += 1;
  next();
}
