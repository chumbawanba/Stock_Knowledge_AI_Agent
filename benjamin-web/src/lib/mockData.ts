import { Highlight, Story } from '@/types';

export const mockHighlights: Highlight[] = [
  {
    id: '1',
    title: 'NVIDIA Announces Next-Gen AI Chips, Stock Surges 8%',
    summary: 'NVIDIA revealed its next-generation AI accelerators at GTC 2024, promising 3x performance improvement. The announcement sent shares soaring in after-hours trading.',
    stock: {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      sector: 'Technology',
    },
    sentiment: 'bullish',
    createdAt: new Date().toISOString(),
    sources: ['NVIDIA Investor Relations', 'Bloomberg', 'Reuters'],
  },
  {
    id: '2',
    title: 'Tesla Faces Production Challenges in Berlin, Downgrades Q2 Guidance',
    summary: 'Tesla announced production delays at its Berlin Gigafactory due to supply chain issues, prompting analysts to lower Q2 delivery expectations by 15%.',
    stock: {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      sector: 'Automotive',
    },
    sentiment: 'bearish',
    createdAt: new Date().toISOString(),
    sources: ['Tesla Press', 'Wall Street Journal', 'CNBC'],
  },
  {
    id: '3',
    title: 'Microsoft Cloud Revenue Beats Expectations, Azure Growth Accelerates',
    summary: 'Microsoft reported cloud revenue exceeding analyst expectations, with Azure growing 29% year-over-year. Enterprise AI adoption driving demand.',
    stock: {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      sector: 'Technology',
    },
    sentiment: 'bullish',
    createdAt: new Date().toISOString(),
    sources: ['Microsoft Investor Relations', 'TechCrunch'],
  },
  {
    id: '4',
    title: 'Apple Launches Vision Pro in Europe, Stock Holds Steady',
    summary: 'Apple began international rollout of Vision Pro headset across European markets. Initial reception positive but sales projections remain conservative.',
    stock: {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      sector: 'Technology',
    },
    sentiment: 'neutral',
    createdAt: new Date().toISOString(),
    sources: ['Apple Newsroom', 'The Verge'],
  },
];

export const mockStories: Record<string, Story> = {
  '1': {
    id: 's1',
    highlightId: '1',
    title: 'NVIDIA Unveils Blackwell Architecture: A New Era for AI Computing',
    content: `NVIDIA today announced its next-generation AI computing platform, the Blackwell architecture, at the annual GTC conference in San Jose. The new GPUs promise to deliver unprecedented performance for AI training and inference workloads.

The flagship B200 GPU offers up to 30x performance improvement in LLM inference compared to the previous Hopper architecture, while consuming less power. This efficiency gain is particularly significant for data center operators looking to scale AI operations.

"We're enabling a new era of AI where organizations can train larger models at a fraction of the cost," said Jensen Huang, NVIDIA's CEO, during the keynote presentation. "Blackwell isn't just an incremental improvement—it's a quantum leap."

Major cloud providers including AWS, Google Cloud, and Microsoft Azure have already committed to offering Blackwell-powered instances. Enterprise adoption is expected to accelerate in the second half of the year.

Wall Street reacted enthusiastically to the news, with multiple analysts upgrading their price targets. The stock closed up 8% in after-hours trading, adding approximately $200 billion to NVIDIA's market cap in a single session.`,
    keyPoints: [
      'Blackwell architecture offers 30x improvement in LLM inference',
      'Major cloud providers committed to Blackwell instances',
      'Stock surged 8% in after-hours trading',
      'Production expected to begin in Q3 2024',
    ],
    sources: ['NVIDIA GTC 2024 Keynote', 'NVIDIA Investor Presentation', 'Company earnings call'],
    publishedAt: new Date().toISOString(),
  },
  '2': {
    id: 's2',
    highlightId: '2',
    title: 'Tesla Berlin Production Hit by Supply Chain Disruptions',
    content: `Tesla's Gigafactory Berlin is experiencing significant production challenges that will impact Q2 delivery numbers, according to sources familiar with the matter.

The factory, which serves as Tesla's primary European production hub, has faced recurring supply chain issues affecting battery component availability. Multiple suppliers have reportedly struggled to meet Tesla's demanding quality standards and delivery timelines.

Analysts at Goldman Sachs and Morgan Stanley have both lowered their Q2 delivery estimates by approximately 15%, citing production constraints. The reduced guidance suggests Tesla may deliver around 180,000 vehicles in Q2 instead of the previously expected 210,000.

"This is a temporary setback, not a structural issue," said Tesla in a statement. "We're working closely with our supplier network to resolve these bottlenecks as quickly as possible."

The news comes amid increased competition in the European EV market from traditional automakers and new entrants. Tesla's market share in Europe has declined from 19% to 14% over the past year, according to industry data.

Despite the near-term challenges, some analysts remain optimistic about Tesla's long-term prospects, particularly if production normalizes in H2 2024.`,
    keyPoints: [
      'Berlin Gigafactory facing battery component shortages',
      'Q2 delivery guidance lowered by 15%',
      'European market share declined to 14%',
      'Production expected to normalize in H2 2024',
    ],
    sources: ['Tesla Press Release', 'Wall Street Journal', 'Goldman Sachs Research'],
    publishedAt: new Date().toISOString(),
  },
  '3': {
    id: 's3',
    highlightId: '3',
    title: 'Microsoft Cloud Growth Exceeds Expectations as Enterprise AI Accelerates',
    content: `Microsoft reported fiscal Q3 results that beat analyst expectations across all key metrics, with cloud revenue leading the way. Azure revenue grew 29% year-over-year, outpacing consensus estimates of 26%.

The strong performance was driven by increased enterprise adoption of AI services built on the Azure platform. Microsoft's strategic partnership with OpenAI continues to pay dividends, with Azure OpenAI service usage growing over 300% in the quarter.

"AI is transforming every business process at Microsoft and our customers," said Satya Nadella, Microsoft's CEO. "We're seeing unprecedented demand for our AI capabilities across all industries."

Enterprise customers including Coca-Cola, HSBC, and Mercedes-Benz announced major Azure AI deployments during the quarter. The company's copilot suite of AI assistants is now used by over 60,000 organizations.

Commercial bookings grew 17%, indicating strong future revenue momentum. Microsoft raised its full-year guidance, signaling confidence in continued growth.

The stock rose 4% in after-hours trading following the announcement. Analysts responded with multiple price target increases, with several setting new all-time high targets.`,
    keyPoints: [
      'Azure revenue grew 29% YoY, beating 26% estimate',
      'Azure OpenAI service usage up 300%',
      'Copilot now used by 60,000+ organizations',
      'Full-year guidance raised',
    ],
    sources: ['Microsoft Investor Relations', 'Q3 Earnings Call Transcript', 'Press Releases'],
    publishedAt: new Date().toISOString(),
  },
  '4': {
    id: 's4',
    highlightId: '4',
    title: 'Apple Vision Pro Launches in Europe to Mixed Reception',
    content: `Apple officially launched Vision Pro, its spatial computing headset, across European markets including the UK, France, Germany, and Italy. The $3,499 device arrived in Apple Stores and through authorized resellers.

Early reviews have been generally positive, praising the device's sophisticated hardware and intuitive user interface. However, critics note the limited app ecosystem and high price point may restrict mainstream adoption.

"Vision Pro represents Apple's vision for the future of computing," said Apple's VP of Marketing. "We're thrilled to bring this revolutionary product to European customers."

Pre-order demand in Europe exceeded Apple's internal expectations, according to supply chain sources. However, analysts remain divided on whether the device will achieve mass-market success.

Some estimates suggest Apple may sell 400,000-500,000 units globally in the first year, well below iPhone or Apple Watch launch numbers. The company has not disclosed official sales figures.

Apple stock held steady following the launch, trading in a narrow range as investors await more data on consumer adoption.`,
    keyPoints: [
      'Vision Pro launched in UK, France, Germany, Italy at $3,499',
      'Early reviews positive on hardware and UX',
      'Limited app ecosystem remains a challenge',
      'First-year sales estimated at 400,000-500,000 units',
    ],
    sources: ['Apple Newsroom', 'The Verge', 'Bloomberg'],
    publishedAt: new Date().toISOString(),
  },
};

export function getHighlightById(id: string): Highlight | undefined {
  return mockHighlights.find(h => h.id === id);
}

export function getStoryByHighlightId(highlightId: string): Story | undefined {
  return mockStories[highlightId];
}
