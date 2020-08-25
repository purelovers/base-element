# Ex-ChatGPT - ChatGPT with ToolFormer

![language](https://img.shields.io/badge/language-python-blue) ![GitHub](https://img.shields.io/github/license/circlestarzero/EX-chatGPT) ![GitHub last commit](https://img.shields.io/github/last-commit/circlestarzero/EX-chatGPT) ![GitHub Repo stars](https://img.shields.io/github/stars/circlestarzero/EX-chatGPT?style=social)

[简体中文](./README.md) English / [Background](./BACKGROUND.md)

ChatGPT can act as a **tool former** without requiring adjustment, generating API requests for questions to assist in answering. Ex-ChatGPT enables ChatGPT to call external APIs, such as **WolframAlpha, Google, and WikiMedia**, to provide more accurate and timely answers.

This project is divided into `Ex-ChatGPT` and `WebChatGPTEnhance`. The former is a service that uses the `GPT3.5 Turbo API` and **Google,WolframAlpha,WikiMedia APIs**, while the latter is a **browser extension** which update the origin WebChatGPT plugin to Enable adding external API, supportting ChatGPT webpage to call different APIs and prompts

## user interface display

### ExChatGPT

![chatHistory](img/newPage.jpg)

### WebChatGPTEnhance

![WebChatGPT](img/chatGPTChromeEnhance.png)

## Highlights

- **Speech Dialogue Functionality**, utilizing Microsoft Azure API to optimize response time (around 1-2 seconds), featuring both speech recognition and text-to-speech capabilities, supporting multiple languages and voices, and allowing for customized voices.
- **Docker and Proxy support**
- **Redundant backup of chat history**
- Support for OpenAI GPT-3.5 Turbo API
- Ability for ChatGPT to call external API interfaces, such as **Google, WolframAlpha, and WikiMedia**
- Clean up Google search results data to reduce token usage.
- Automatic saving and loading of conversation history with **automatic compression**
