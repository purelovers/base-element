# Ex-ChatGPT - ChatGPT with ToolFormer

![language](https://img.shields.io/badge/language-python-blue) ![GitHub](https://img.shields.io/github/license/circlestarzero/EX-chatGPT) ![GitHub last commit](https://img.shields.io/github/last-commit/circlestarzero/EX-chatGPT) ![GitHub Repo stars](https://img.shields.io/github/stars/circlestarzero/EX-chatGPT?style=social)

简体中文 [English](./README.en.md) / [Background](./BACKGROUND.md)

ChatGPT 是一个强大的工具平台，可以无需任何调整就生成 API 请求来协助回答问题。`Ex-ChatGPT` 使得 ChatGPT 能够调用外部 API，例如 **WolframAlpha、Google 和 WikiMedia**，以提供更准确和及时的答案。

这个项目分为 `Ex-ChatGPT` 和 `WebChatGPTEnhance` 两部分。前者是一个使用了 `GPT3.5 Turbo API`、**WolframAlpha、Google 和 WikiMedia** 等 API 的服务，能够提供更强大的功能和更准确的答案。后者是一个**浏览器扩展程序**，它更新了原有的 WebChatGPT 插件以支持添加外部 API，支持 ChatGPT 网页调用不同的 API 和提示。

## 交互界面

### ExChatGPT

![chatHistory](img/newPage.jpg)

### WebChatGPTEnhance

![WebChatGPT](img/chatGPTChromeEnhance.png)

## Highlights

-   **语音对话功能**，使用微软 Azure API，优化响应速度 ( 1-2 秒左右 ) ，包含语音识别和文字转语音，支持多种音色和语言，自定义声音。
-   **docker 和 proxy 支持**
-   **聊天记录冗余备份**
-   支持 OpenAI GPT-3.5 Turbo API
-   允许 ChatGPT 调用外部 API 接口 ( **Google,WolframAlpha,WikiMedia** )
-   对 Google 搜索结果进行数据清洗, 减少token占用
-   自动保存载入对话历史，**自动压缩对话**
-   **可显示使用的 Token 数量**
-   **API池**, **API** 冷却
-   **Markdown and MathJax** 渲染
-   调用**API 过程显示动画**, 类似必应
-   **历史对话管理**载入，类 chatgpt 页面布局
-   **快捷键**快速选择模式 `Tab` 和换行 `Shift+Enter`,`Enter` 发送， `up`,`down` 选择历史发送消息，类似终端
-   `stream` 特性，它类似于打字机的效果，可以更快地响应结果。与一次性加载所有内容不同，stream会逐步输出结果。如示例中所示：
![stream](img/stream.gif)
-   `chat` 模式下**prompt 自动补全**选择，支持模糊搜索， 拼音搜索， 支持自定义 prompt, 项目中自带 [awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) 中的 `prompt`
![promptCompletion](img/promptCompletion.gif)

## 计划更新

-   [ ] 移动端界面适配
-   [ ] 发送图片OCR识别公式文字
-   [ ] OAuth2.0多用户鉴权
-   [ ] 调用diffusing model生成图片(达到类似多模态效果)
-   [ ] 网页搜索结果进一步爬虫总结清洗数据
-   [ ] 增加代码运行API,以及更多API
-   [ ] 聊天记录/本地知识数据库embedding对齐检索

## 安装

### Ex-chatGPT Installation

-   `pip install`
`pip install -r requirements.txt`
-   将 `apikey.ini.example` 复制改名为 `apikey.ini`,然后在 `apikey.ini` 中填入你的 API 密钥， 以及代理 ( 如果只有一个 `openAI` 的 `API key`,将 `key1 = sk-xxxx; key2 = sk-xxxx` 删除即可 )
  -   `Google api key and search engine id` [申请](https://developers.google.com/custom-search/v1/overview?hl=en)
  -   `wolframAlpha app id key` [申请](https://products.wolframalpha.com/api/)
  -   `openAI api key`( 新功能 ) 或 `chatGPT access_token` ( 旧版本 ) [申请](https://platform.openai.com)
  -   (可选) 在 `apikey.ini` 中填写`Azure API key` 和 `region` [申请](https://learn.microsoft.com/zh-cn/azure/cognitive-services/speech-service)
-   运行 `main.py` 并打开 `http://127.0.0.