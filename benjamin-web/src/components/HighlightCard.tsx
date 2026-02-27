'use client';

import Link from 'next/link';
import { Highlight } from '@/types';

interface HighlightCardProps {
  highlight: Highlight;
}

const sentimentColors = {
  bullish: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  bearish: 'bg-red-500/10 text-red-600 border-red-500/20',
  neutral: 'bg-zinc-500/10 text-zinc-600 border-zinc-500/20',
};

export function HighlightCard({ highlight }: HighlightCardProps) {
  return (
    <Link
      href={`/highlight/${highlight.id}`}
      className="group block rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-zinc-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-sm font-semibold text-zinc-900">
              {highlight.stock.symbol}
            </span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${sentimentColors[highlight.sentiment]}`}>
              {highlight.sentiment}
            </span>
            <span className="text-xs text-zinc-400">
              {highlight.stock.sector}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors mb-2">
            {highlight.title}
          </h2>
          <p className="text-zinc-600 text-sm leading-relaxed">
            {highlight.summary}
          </p>
        </div>
        <div className="hidden sm:flex items-center text-sm text-zinc-400 group-hover:text-blue-600 transition-colors">
          Read more →
        </div>
      </div>
    </Link>
  );
}
