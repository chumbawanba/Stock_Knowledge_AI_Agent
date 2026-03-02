import yfinance as yf
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
És um analista financeiro.
Recebes dados reais de um stock e deves gerar:

1. summary (1 frase)
2. story (2–3 frases de contexto)

Não inventes números.
Não devolvas JSON inválido.
"""

def run_stock_agent(ticker: str) -> dict:
    stock = yf.Ticker(ticker)
    hist = stock.history(period="2d")

    if hist.empty or len(hist) < 2:
        raise ValueError(f"Sem dados suficientes para {ticker}")

    yesterday = hist.iloc[-2]
    today = hist.iloc[-1]

    price = round(today["Close"], 2)
    change_pct = round(
        ((today["Close"] - yesterday["Close"]) / yesterday["Close"]) * 100,
        2
    )

    company_name = stock.info.get("shortName", ticker)

    llm_input = f"""
Ticker: {ticker}
Empresa: {company_name}
Preço atual: {price} USD
Variação diária: {change_pct}%

Gera apenas texto.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": llm_input}
        ],
        temperature=0.4
    )

    text = response.choices[0].message.content.strip()

    # separação simples e segura
    summary, story = text.split("\n", 1) if "\n" in text else (text, text)

    return {
        "ticker": ticker,
        "company": company_name,
        "price_usd": price,
        "change_pct": change_pct,
        "summary": summary.strip(),
        "story": story.strip()
    }
