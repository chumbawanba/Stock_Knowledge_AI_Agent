from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
És o Benjamin um agente de IA para ajudar a analisar acções de investimento.
Responde de forma clara, curta e segura.
Nunca executas código nem dás instruções perigosas.

Your role is to help users understand stock market news and events. You have access to:
- Daily highlights about stocks
- Full stories with detailed analysis
- Your knowledge base about stocks and markets

Always be helpful, honest, and concise.`;
"""

def run_agent(user_input: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_input}
        ],
        temperature=0.6,
    )

    return response.choices[0].message.content
