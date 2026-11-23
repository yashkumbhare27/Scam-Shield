export type Language = 'en' | 'hi' | 'mr';

export type CheckMode = 'self' | 'parent';

export type Verdict = 'likely_scam' | 'suspicious' | 'no_red_flags';

export type Confidence = 'low' | 'medium' | 'high';

export type LinkRisk = 'low' | 'medium' | 'high';

export interface RedFlag {
  type: string;
  evidence: string;
  explanation: string;
}

export interface LinkFinding {
  url: string;
  risk: LinkRisk;
  reason: string;
}

export interface AnalyzeRequest {
  text: string | null;
  image_base64: string | null;
  language: Language;
  mode: CheckMode;
}

export interface AnalyzeResponse {
  verdict: Verdict;
  confidence: Confidence;
  red_flags: RedFlag[];
  links: LinkFinding[];
  next_steps: string[];
  report_info: string;
  simple_explanation: string;
  spoken_text: string;
  reputation?: {
    reported_count: number;
  };
  extracted_text?: string;
}

export interface FeedbackRequest {
  verdict: Verdict;
  was_correct: boolean;
  language: Language;
}

export interface HealthResponse {
  status: 'ok';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ChatContextSummary {
  verdict?: Verdict;
  red_flag_types?: string[];
  link_risks?: string[];
  mode?: CheckMode;
}

export interface ChatRequest {
  messages: ChatMessage[];
  language: Language;
  context?: ChatContextSummary;
}

export interface ChatResponse {
  reply: string;
  suggestions: string[];
}

export interface SuggestRequest {
  verdict: Verdict;
  red_flags: RedFlag[];
  links: LinkFinding[];
  language: Language;
  mode: CheckMode;
}

export interface SuggestResponse {
  family_message: string;
  action_tips: string[];
  chat_prompts: string[];
}
