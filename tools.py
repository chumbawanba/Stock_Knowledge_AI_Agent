import json
from datetime import datetime
from stock_agent import run_stock_agent

DATA_PATH = "data/stock_knowledge.json"

def update_stock_knowledge(watchlist: list[str]) -> str:
    results = []

    for ticker in watchlist:
        try:
            stock_info = run_stock_agent(ticker)
            results.append(stock_info)
        except Exception as e:
            results.append({
                "ticker": ticker,
                "error": str(e)
            })

    payload = {
        "last_updated": datetime.utcnow().isoformat(),
        "watchlist": results
    }

    with open(DATA_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)

    return "📈 Stock knowledge atualizado com sucesso."
