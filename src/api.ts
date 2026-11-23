import { APP_CONFIG } from './config';
import type {
  AnalyzeRequest,
  AnalyzeResponse,
  ChatRequest,
  ChatResponse,
  FeedbackRequest,
  SuggestRequest,
  SuggestResponse,
} from './types';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

export async function analyzeMessage(
  payload: AnalyzeRequest,
): Promise<AnalyzeResponse> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, APP_CONFIG.clientTimeoutMs);

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const msg =
        data && typeof data.error === 'string'
          ? data.error
          : 'Could not complete check';
      throw new ApiError(msg, response.status);
    }

    return data as AnalyzeResponse;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('Request timed out', 408);
    }
    throw new ApiError('Network error', 0);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function sendFeedback(payload: FeedbackRequest): Promise<void> {
  const response = await fetch('/api/feedback', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new ApiError('Feedback failed', response.status);
  }
}

export async function sendChatMessage(
  payload: ChatRequest,
): Promise<ChatResponse> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, APP_CONFIG.clientTimeoutMs);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const msg =
        data && typeof data.error === 'string'
          ? data.error
          : 'Could not get a reply right now';
      throw new ApiError(msg, response.status);
    }
    return data as ChatResponse;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiError('Request timed out', 408);
    }
    throw new ApiError('Network error', 0);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function fetchAiSuggestions(
  payload: SuggestRequest,
): Promise<SuggestResponse> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, APP_CONFIG.clientTimeoutMs);

  try {
    const response = await fetch('/api/suggest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new ApiError('Suggestions unavailable', response.status);
    }
    return data as SuggestResponse;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
