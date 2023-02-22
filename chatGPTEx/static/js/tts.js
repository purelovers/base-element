const enableChinese = true;
// https://clearn.microsoft.com/zh-cn/azure/cognitive-services/speech-service/language-support?tabs=tts
const createSpeechConfig = (() => {
    let speechConfig;
    return async () => {
        if (!speechConfig) {
            try {
                const response = await fetch('/api/getAzureAPIKey');
                const data = await response.json();
             