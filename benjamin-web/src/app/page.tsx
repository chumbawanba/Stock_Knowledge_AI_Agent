import { mockHighlights } from '@/lib/mockData';
import { HighlightCard } from '@/components/HighlightCard';
import { ChatWidget } from '@/components/ChatWidget';

export default function Home() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-zinc-900">Benjamin</h1>
          <p className="text-zinc-500 mt-1">Stock market insights powered by AI</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Today&apos;s Highlights</h2>
            <p className="text-sm text-zinc-500">{today}</p>
          </div>
          <button className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors">
            Subscribe
          </button>
        </div>

        <div className="space-y-4">
          {mockHighlights.map(highlight => (
            <HighlightCard key={highlight.id} highlight={highlight} />
          ))}
        </div>
      </main>

      <ChatWidget />
    </div>
  );
}
