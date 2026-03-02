import streamlit as st
from agent_benjamin import run_benjamin
from tools import update_stock_knowledge

st.title("🤖 Benjamin — Investment Agent")

if st.button("🔄 Update stock knowledge"):
    watchlist = ["AAPL", "MSFT", "NVDA", "TSLA", "BRKB"]
    msg = update_stock_knowledge(watchlist)
    st.success(msg)

user_input = st.chat_input("Pergunta ao Benjamin...")

if user_input:
    response = run_benjamin(user_input)
    st.chat_message("assistant").markdown(response)
