import json
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
DATA_PATH = "data/stock_knowledge.json"

def load_stock_context() -> str:
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        return json.dumps(data, indent=2, ensure_ascii=False)
    except FileNotFoundError:
        return "Sem dados de stocks disponíveis."

def run_benjamin(user_input: str) -> str:
    stock_context = load_stock_context()

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "És o agente Benjamin, focado em investimento.\n"
                    "Usa o CONTEXTO DE STOCKS apenas quando relevante.\n\n"
                    f"CONTEXTO:\n{stock_context}"
                )
            },
            {"role": "user", "content": user_input}
        ],
        temperature=0.6
    )

    return response.choices[0].message.content
