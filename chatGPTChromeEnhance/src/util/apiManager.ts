import {SearchResult} from "src/content-scripts/api"
import Browser from "webextension-polyfill"
import { v4 as uuidv4 } from 'uuid'
import { getUserConfig } from "./userConfig"
export const SAVED_API_KEY = 'saved_apis'


export interface API{
    uuid?: string,
    name: string,
    text: string
}

//fill you google API KEY and CLient ID
export const getDefaultAPI = () => {
    return {
        name: 'Default API',
        text: 'async function GoogleSearch(query, numResults, timePeriod, region) { const headers = new Headers({ Origin: "https://chat.openai.com", }); const searchParams = new URLSearchParams(); searchParams.set("q", query); searchParams.set("key", "YOUR_GOOGLE_API_KEY"); searchParams.set("cx", "YOUR_GOOGLE_CLIENT_ID"); searchParams.set("c2coff", "0"); searchParams.set("num", numResults.toString()); const url = `https://customsearch.googleapis.com/customsearch/v1?${searchParams.toString()}`; console.log(url); const response = await fetch(url, { method: "GET", headers, }); const results = await response.json(); const items = results.items; const filteredData = items.map(({ title, link, snippet }) => ({ title, link, snippet })); return filteredData;}',
        uuid: 'default'
    }
}

export const getCurrentAPI = async () => {
    const userConfig = await getUserConfig()
    const currentAPIUuid = userConfig.APIUUID
    const savedAPIs = await getsavedAPIs()
    return savedAPIs.find((i: API) => i.uuid === currentAPIUuid) || getDefaultAPI()
}

export const getsavedAPIs = async (addDefaults = true) => {
    const data = await Browser.storage.sync.get([SAVED_API_KEY])
    const savedAPIs = data[SAVED_API_KEY] || []
    if (addDefaults)
        return addDefaultAPIs(savedAPIs)
    return save