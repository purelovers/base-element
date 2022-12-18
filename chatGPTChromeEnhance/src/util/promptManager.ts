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
    //const formattedResults = formatWebResult