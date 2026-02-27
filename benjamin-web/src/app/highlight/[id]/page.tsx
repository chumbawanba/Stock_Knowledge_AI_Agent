import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockHighlights, getStoryByHighlightId } from '@/lib/mockData';
import { ChatWidget } from '@/components/ChatWidget';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function HighlightPage({ params }: PageProps) {
  const { id } = await params;
  const highlight = mockHighlights.find(h => h.id === id);
  const story = getStoryByHighlightId(id);

  if (!highlight) {
    notFound();
  }

  const sentimentColors = {
    bullish: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    bearish: 'bg-red-500/10 text-red-600 border-red-500/20',
    neutral: 'bg-zinc-500/10 text-zinc-600 border-zinc-500/20',
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors">
            ← Back to highlights
          </Link>
          <h1 className="text-2xl font-bold text-zinc-900 mt-2">Benjamin</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <article>
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-sm font-semibold text-zinc-900">
              {highlight.stock.symbol}
            </span>
            <span className="text-sm text-zinc-400">{highlight.stock.name}</span>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${sentimentColors[highlight.sentiment]}`}>
              {highlight.sentiment}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-zinc-900 mb-4">
            {highlight.title}
          </h2>

          <p className="text-lg text-zinc-600 mb-8">
            {highlight.summary}
          </p>

          {story && (
            <div className="bg-white rounded-xl border border-zinc-200 p-6 mb-8">
              <h3 className="text-lg font-semibold text-zinc-900 mb-4">{story.title}</h3>
              <div className="prose prose-zinc max-w-none">
                {story.content.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-zinc-600 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {story.keyPoints.length > 0 && (
                <div className="mt-6 pt-6 border-t border-zinc-100">
                  <h4 className="font-semibold text-zinc-900 mb-3">Key Points</h4>
                  <ul className="space-y-2">
                    {story.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                        <span className="text-emerald-500 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {story.sources.length > 0 && (
                <div className="mt-6 pt-6 border-t border-zinc-100">
                  <h4 className="font-semibold text-zinc-900 mb-2 text-sm">Sources</h4>
                  <ul className="text-sm text-zinc-500">
                    {story.sources.map((source, i) => (
                      <li key={i}>{source}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="text-sm text-zinc-500">
            <p>Sources: {highlight.sources.join(', ')}</p>
          </div>
        </article>
      </main>

      <ChatWidget context={{ highlight, story: story || undefined }} />
    </div>
  );
}
