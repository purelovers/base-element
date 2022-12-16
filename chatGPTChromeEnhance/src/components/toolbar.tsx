
import { h } from 'preact'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { icons } from 'src/util/icons'
import { getSavedPrompts, Prompt } from 'src/util/promptManager'
import { getsavedAPIs,API} from 'src/util/apiManager'
import { getUserConfig, updateUserConfig } from 'src/util/userConfig'
import timePeriodOptions from 'src/util/timePeriodOptions.json'
import regionOptions from 'src/util/regionOptions.json'
import Browser from 'webextension-polyfill'
import Dropdown from './dropdown'
import { getTranslation, localizationKeys, setLocaleLanguage } from 'src/util/localization'
import Footer from './footer'


const numResultsOptions = Array.from({ length: 10 }, (_, i) => i + 1).map((num) => ({
    value: num,
    label: `${num} result${num === 1 ? '' : 's'}`
}))

function Toolbar() {
    const [webAccess, setWebAccess] = useState(true)
    const [numResults, setNumResults] = useState(3)
    const [timePeriod, setTimePeriod] = useState('')
    const [region, setRegion] = useState('wt-wt')
    const [promptUUID, setPromptUUID] = useState<string>('')
    const [prompts, setPrompts] = useState<Prompt[]>([])
    const [apiUUID, setAPIUUID] = useState<string>('')
    const [apis, setAPIS] = useState<API[]>([])

    useEffect(() => {
        getUserConfig().then((userConfig) => {
            setWebAccess(userConfig.webAccess)
            setNumResults(userConfig.numWebResults)
            setTimePeriod(userConfig.timePeriod)
            setRegion(userConfig.region)
            setPromptUUID(userConfig.promptUUID)
            setAPIUUID(userConfig.promptUUID)
            setLocaleLanguage(userConfig.language)
        })
        updatePrompts()
        updateAPIs()
    }, [])

    const handlePromptClick = () => {
        updatePrompts()
    }
    const handleAPIClick = () => {
        updateAPIs()
    }

    const updatePrompts = () => {
        getSavedPrompts().then((savedPrompts) => {
            setPrompts(savedPrompts)
        })
    }
    const updateAPIs = () => {
        getsavedAPIs().then((savedAPIs) => {
            setAPIS(savedAPIs)
        })
    }

    const handleWebAccessToggle = useCallback(() => {
        setWebAccess(!webAccess)
        updateUserConfig({ webAccess: !webAccess })
    }, [webAccess])

    const handleNumResultsChange = (e: { target: { value: string } }) => {
        const value = parseInt(e.target.value, 10)
        setNumResults(value)
        updateUserConfig({ numWebResults: value })
    }

    const handleTimePeriodChange = (e: { target: { value: string } }) => {
        setTimePeriod(e.target.value)
        updateUserConfig({ timePeriod: e.target.value })
    }

    const handleRegionChange = (e: { target: { value: string } }) => {
        setRegion(e.target.value)
        updateUserConfig({ region: e.target.value })
    }

    const handlePromptChange = (uuid: string) => {
        removeFocusFromCurrentElement()

        setPromptUUID(uuid)
        updateUserConfig({ promptUUID: uuid })
    }
    const handleAPIChange = (uuid: string) => {
        removeFocusFromCurrentElement()
        setAPIUUID(uuid)
        updateUserConfig({ APIUUID: uuid })
    }

    const removeFocusFromCurrentElement = () => (document.activeElement as HTMLElement)?.blur()


    const webAccessToggle = <label className="wcg-relative wcg-inline-flex wcg-cursor-pointer wcg-items-center">
        <input type="checkbox" value="" className="wcg-peer wcg-sr-only" checked={webAccess} onChange={handleWebAccessToggle} />
        <div className="wcg-peer wcg-h-5 wcg-w-14 wcg-rounded-full wcg-bg-gray-500 after:wcg-absolute after:wcg-top-[10px] after:wcg-left-[0px] after:wcg-h-5 after:wcg-w-6 after:wcg-rounded-full after:wcg-border after:wcg-border-gray-300 after:wcg-bg-white after:wcg-transition-all after:wcg-content-[''] peer-checked:wcg-bg-emerald-700 peer-checked:after:wcg-translate-x-full peer-checked:after:wcg-border-white dark:wcg-border-gray-600" />
        <span className="wcg-ml-1 wcg-pl-1 wcg-text-sm wcg-font-semibold after:wcg-content-['Web'] md:after:wcg-content-['Web_access']" />
    </label>

    return (
        <div className="wcg-flex wcg-flex-col wcg-gap-0">
            <div className="wcg-toolbar wcg-flex wcg-items-center wcg-justify-between wcg-gap-2 wcg-rounded-md wcg-px-1">
                <div className="wcg-btn-xs wcg-btn"
                    onClick={() => Browser.runtime.sendMessage("show_options")}
                >
                    {icons.tune}
                </div>
                {webAccessToggle}
                <Dropdown
                    value={numResults}
                    onChange={handleNumResultsChange}
                    options={numResultsOptions} />
                <Dropdown
                    value={timePeriod}
                    onChange={handleTimePeriodChange}
                    options={timePeriodOptions} />
                <Dropdown
                    value={region}
                    onChange={handleRegionChange}
                    options={regionOptions} />
                <div className="wcg-dropdown-top wcg-dropdown wcg-min-w-[9.5rem]"
                    onClick={handlePromptClick}
                >
                    <div tabIndex={0} className="wcg-flex wcg-cursor-pointer wcg-flex-row wcg-items-center wcg-justify-between wcg-gap-0 wcg-px-2">
                        <label className="wcg-max-w-[7rem] wcg-cursor-pointer wcg-justify-start wcg-truncate wcg-pr-0 wcg-text-sm wcg-font-semibold wcg-normal-case">
                            {prompts?.find((prompt) => prompt.uuid === promptUUID)?.name || 'Default prompt'}
                        </label>
                        {icons.expand}
                    </div>
                    <ul tabIndex={0} className="wcg-dropdown-content wcg-menu wcg-m-0 wcg-flex wcg-max-h-96 wcg-w-52 wcg-flex-col
                    wcg-flex-nowrap wcg-overflow-auto
                    wcg-rounded-md wcg-bg-gray-800 wcg-p-0"
                    >
                        {prompts.map((prompt) =>
                            <li tabIndex={0} className="wcg-text-sm wcg-text-white hover:wcg-bg-gray-700"
                                onClick={() => handlePromptChange(prompt.uuid)}
                                key={prompt.uuid}
                            >
                                <a>{prompt.name}</a>
                            </li>
                        )
                        }
                        <li className="wcg-text-sm wcg-text-white hover:wcg-bg-gray-700"
                            onClick={() => Browser.runtime.sendMessage("show_options")
                            }
                        >
                            <a>+ {getTranslation(localizationKeys.buttons.newPrompt)}</a>
                        </li>
                    </ul>
                </div>
                <div className="wcg-dropdown-top wcg-dropdown wcg-min-w-[9.5rem]"
                    onClick={handleAPIClick}
                >
                    <div tabIndex={0} className="wcg-flex wcg-cursor-pointer wcg-flex-row wcg-items-center wcg-justify-between wcg-gap-0 wcg-px-2">
                        <label className="wcg-max-w-[7rem] wcg-cursor-pointer wcg-justify-start wcg-truncate wcg-pr-0 wcg-text-sm wcg-font-semibold wcg-normal-case">
                            {apis?.find((api) => api.uuid === apiUUID)?.name || 'Default API'}
                        </label>
                        {icons.expand}
                    </div>
                    <ul tabIndex={0} className="wcg-dropdown-content wcg-menu wcg-m-0 wcg-flex wcg-max-h-96 wcg-w-52 wcg-flex-col
                    wcg-flex-nowrap wcg-overflow-auto
                    wcg-rounded-md wcg-bg-gray-800 wcg-p-0"
                    >
                        {apis.map((api) =>
                            <li tabIndex={0} className="wcg-text-sm wcg-text-white hover:wcg-bg-gray-700"
                                onClick={() => handleAPIChange(api.uuid)}
                                key={api.uuid}
                            >
                                <a>{api.name}</a>
                            </li>
                        )
                        }
                        <li className="wcg-text-sm wcg-text-white hover:wcg-bg-gray-700"
                            onClick={() => Browser.runtime.sendMessage("show_API_options")
                            }
                        >
                            <a>+ New API</a>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Toolbar