from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
És um agente de IA para um MVP público.
Responde de forma clara, curta e segura.
Nunca executas código nem dás instruções perigosas.
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
