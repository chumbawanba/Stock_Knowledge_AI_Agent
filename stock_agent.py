# stock_agent.py
import yfinance as yf
from openai import OpenAI
import os
import time

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
És um analista financeiro.
Gera:
- summary (1 frase)
- story (2–3 frases)
Não inventes números.
"""

def run_stock_agent(ticker: str) -> dict:
    # delay defensivo (CRÍTICO)
    time.sleep(2)

    stock = yf.Ticker(ticker)

    try:
        info = stock.fast_info
        price = round(info["last_price"], 2)
        prev_close = info["previous_close"]

        change_pct = round(
            ((price - prev_close) / prev_close) * 100, 2
        )

        company_name = stock.info.get("shortName", ticker)

    except Exception as e:
        raise ValueError("Rate limit ou dados indisponíveis")

    llm_input = f"""
Ticker: {ticker}
Empresa: {company_name}
Preço: {price} USD
Variação diária: {change_pct}%
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
    lines = text.split("\n")

    summary = lines[0]
    story = " ".join(lines[1:]) if len(lines) > 1 else summary

    return {
        "ticker": ticker,
        "company": company_name,
        "price_usd": price,
        "change_pct": change_pct,
        "summary": summary,
        "story": story
    }
