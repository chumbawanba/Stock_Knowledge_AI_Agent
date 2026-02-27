export interface Stock {
  symbol: string;
  name: string;
  sector: string;
}

export interface Highlight {
  id: string;
  title: string;
  summary: string;
  stock: Stock;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  createdAt: string;
  sources: string[];
}

export interface Story {
  id: string;
  highlightId: string;
  title: string;
  content: string;
  keyPoints: string[];
  sources: string[];
  publishedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatRequest {
  message: string;
  context?: {
    highlightId?: string;
    highlight?: Highlight;
    story?: Story;
  };
}

export interface ChatResponse {
  message: string;
  sources?: string[];
}
