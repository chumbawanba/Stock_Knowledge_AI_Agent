import streamlit as st
from agent import run_agent

st.set_page_config(page_title="Benjamin AI stock advisor", page_icon="🤖")

st.title("🤖 Benjamin AI stock advisor")
st.write("AI agent to provide input on stocks")

if "messages" not in st.session_state:
    st.session_state.messages = []

for msg in st.session_state.messages:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"])

user_input = st.chat_input("Escreve a tua pergunta...")

if user_input:
    st.session_state.messages.append(
        {"role": "user", "content": user_input}
    )

    with st.chat_message("user"):
        st.markdown(user_input)

    with st.chat_message("assistant"):
        with st.spinner("A pensar..."):
            response = run_agent(user_input)
            st.markdown(response)

    st.session_state.messages.append(
        {"role": "assistant", "content": response}
    )
