import { SearchResult } from "src/content-scripts/api"
import Browser from "webextension-polyfill"
import { v4 as uuidv4 } from 'uuid'
import { getCurrentLanguageName, getLocaleLanguage, getTranslation, localizationKeys } from "./localization"
import { getUserConfig } from "./userConfig"

export const SAVED_PROMPTS_KEY = 'saved_prompts'

export interface Prompt {
    uuid?: string,
    name: string,
    text: string
}
export interface APIs{
    uuid?: string,
    name: string,
    text: string
}
function hasKey(obj: any, key: string): boolean {
    return key in obj;
  }
  
function hasValue(obj: any, value: any): boolean {
    return Object.values(obj).includes(value);
}
export const compilePrompt = async (results: SearchResult[], query: string) => {
    const currentPrompt = await getCurrentPrompt()
    //const formattedResults = formatWebResults(results)
    let formattedResults =  JSON.stringify(results)
    const regexList = [/\bnigger\w*/i, /\bfaggot\w*/i, /\bkike\w*/i, /\bdykes?\b/i, /\bwetbacks?\b/i, /\bchinks?\b/i, /\bgooks?\b/i, /\bpakis?\b/i, /\binjuns?\b/i, /\btrannys?\b/i, /\btrannies\b/i, /\bspicks?\b/i, /\bshemales?\b/i, ];
    for (const regex of regexList) {
        formattedResults = formattedResults.replace(regex, '***'); // substitute each regex with an empty string
    }
    const currentDate = new Date().toLocaleDateString()
    const prompt = replaceVariables(currentPrompt.text, {
        '{web_results}': formattedResults,
        '{query}': query,
        '{current_date}': currentDate
    })
    return prompt
}

const formatWebResults = (results: SearchResult[]) => {
    let counter = 1
    return results.reduce((acc, result): string => acc += `[${counter++}] "${result.body}"\nURL: ${result.href}\n\n`, "")
}

const replaceVariables = (prompt: string, variables: { [key: string]: string }) => {
    let newPrompt = prompt
    for (const key in variables) {
        try {
            newPrompt = newPrompt.replaceAll(key, variables[key])
        } catch (error) {
            console.log("WebChatGPT error --> API error: ", error)
        }
    }
    return newPrompt
}

export const getDefaultPrompt = () => {
    return {
        name: 'Default prompt',
        text: getTranslation(localizationKeys.defaultPrompt, 'en') + (getLocaleLanguage() !== 'en' ? `\nReply in ${getCurrentLanguageName()}` : ''),
        uuid: 'default'
    }
}

const getDefaultEnglishPrompt = () => {
    return { name: 'Default English', text: getTranslation(localizationKeys.defaultPrompt, 'en'), uuid: 'default_en' }
}

export const getCurrentPrompt = async () => {
    const userConfig = await getUserConfig()
    const currentPromptUuid = userConfig.promptUUID
    const savedPrompts = await getSavedPrompts()
    return savedPrompts.find((i: Prompt) => i.uuid === currentPromptUuid) || getDefaultPrompt()
}

export const getSavedPrompts = async (addDefaults = true) => {
    const data = await Browser.storage.sync.get([SAVED_PROMPTS_KEY])
    const savedPrompts = data[SAVED_PROMPTS_KEY] || []
    if (addDefaults)
        return addDefaultPrompts(savedPrompts)

    return savedPrompts
}
function addDefaultPrompts(prompts: Prompt[]) {
    if (getLocaleLanguage() !== 'en') {
        addPrompt(prompts, getDefaultEnglishPrompt())
    }
    addPrompt(prompts, getDefaultPrompt())
    return prompts

    function addPrompt(prompts: Prompt[], prompt: Prompt) {
        const index = prompts.findIndex((i: Prompt) => i.uuid === prompt.uuid)
        if (index >= 0) {
            prompts[index] = prompt
        } else {
            prompts.unshift(prompt)
        }
    }
}

export const savePrompt = async (prompt: Prompt) => {
    const savedPrompts = await getSavedPrompts(false)
    const index = savedPrompts.findIndex((i: Prompt) => i.uuid === prompt.uuid)
    if (index >= 0) {
        savedPrompts[index] = prompt
    } else {
        prompt.uuid = uuidv4()
        savedPrompts.push(prompt)
    }
    await Browser.storage.sync.set({ [SAVED_PROMPTS_KEY]: savedPrompts })
}

export const deletePrompt = async (prompt: Prompt) => {
    let savedPrompts = await getSavedPrompts()
    savedPrompts = savedPrompts.filter((i: Prompt) => i.uuid !== prompt.uuid)
    await Browser.storage.sync.set({ [SAVED_PROMPTS_KEY]: savedPrompts })
}
