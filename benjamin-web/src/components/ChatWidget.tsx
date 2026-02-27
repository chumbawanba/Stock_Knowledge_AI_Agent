'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage, Highlight, Story } from '@/types';

interface ChatWidgetProps {
  context?: {
    highlight?: Highlight;
    story?: Story;
  };
}

export function ChatWidget({ context }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const initialMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: context?.highlight
        ? `Hi! I'm Benjamin. I'm currently looking at ${context.highlight.stock.symbol} - ${context.highlight.title}. Ask me anything about this!`
        : "Hi! I'm Benjamin. I can help you understand what's happening with stocks today. What would you like to know?",
      timestamp: new Date().toISOString(),
    };
    return [initialMessage];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          context: context ? {
            highlightId: context.highlight?.id,
            highlight: context.highlight,
            story: context.story,
          } : undefined,
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden">
          <div className="bg-zinc-900 px-4 py-3">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Benjamin
            </h3>
            {context?.highlight && (
              <p className="text-zinc-400 text-xs mt-1">
                Context: {context.highlight.stock.symbol}
              </p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    message.role === 'user'
                      ? 'bg-zinc-900 text-white'
                      : 'bg-zinc-100 text-zinc-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-100 rounded-2xl px-4 py-2.5 text-sm text-zinc-500">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-zinc-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask Benjamin..."
                className="flex-1 px-4 py-2 rounded-full border border-zinc-200 text-sm focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-full bg-zinc-900 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-zinc-900 text-white shadow-lg hover:bg-zinc-800 transition-colors flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
