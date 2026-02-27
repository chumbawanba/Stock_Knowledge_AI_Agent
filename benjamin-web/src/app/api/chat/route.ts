import { NextRequest, NextResponse } from 'next/server';

const BENJAMIN_RULES = [
  'Never recommend buying or selling stocks',
  'Say when something is not a hot topic',
  'Use simple language',
  'Assume uncertainty when appropriate',
  'Prefer explaining over opinionating',
];

const systemPrompt = `You are Benjamin, an AI stock market analyst assistant.

RULES (you must follow these):
${BENJAMIN_RULES.map(r => `- ${r}`).join('\n')}

Your role is to help users understand stock market news and events. You have access to:
- Daily highlights about stocks
- Full stories with detailed analysis
- Your knowledge base about stocks and markets

Always be helpful, honest, and concise.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    let contextInfo = '';
    if (context?.highlight) {
      contextInfo = `
CURRENT CONTEXT - ${context.highlight.stock.symbol}:
Title: ${context.highlight.title}
Summary: ${context.highlight.summary}
Sentiment: ${context.highlight.sentiment}
${context.story ? `Story: ${context.story.content.slice(0, 1000)}...` : ''}
`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...(contextInfo ? [{ role: 'user', content: `Context: ${contextInfo}\n\nQuestion: ${message}` }] : [{ role: 'user', content: message }]),
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI error:', error);
      return NextResponse.json(
        { message: 'Sorry, I had trouble processing that. Please try again.' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'I apologize, but I could not generate a response.';

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
