import { h } from 'preact'
import { useState, useEffect, useRef, useLayoutEffect } from 'preact/hooks'
import { getTranslation, localizationKeys } from 'src/util/localization'
import { deletePrompt, getDefaultPrompt, getSavedPrompts, Prompt, savePrompt } from 'src/util/promptManager'
import TooltipWrapper from './tooltipWrapper'

const PromptEditor = (
    props: {
        language: string
    }
) => {
    const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([])
    const [prompt, setPrompt] = useState<Prompt>(getDefaultPrompt())
    const [hasWebResultsPlaceholder, setHasWebResultsPlaceholder] = useState(false)
    const [hasQueryPlaceholder, setHasQueryPlaceholder] = useState(false)
    const [deleteBtnText, setDeleteBtnText] = useState("delete")

    const [showErrors, setShowErrors] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [textError, setTextError] = useState(false)
    const [webResultsError, setWebResultsError] = useState(false)
    const [queryError, setQueryError] = useState(false)

    useLayoutEffect(() => {
        updateSavedPrompts()
    }, [])

    const updateSavedPrompts = async () => {
        const prompts = await getSavedPrompts()
        setSavedPrompts(prompts)
        if (prompt.uuid === 'default') {
            setPrompt(prompts[0])
        }
    }

    useEffect(() => {
        updateSavedPrompts()
    }, [props.language])

    useEffect(() => {
        updatePlaceholderButtons(prompt.text)
    }, [prompt])

    useEffect(() => {
        setNameError(prompt.name.trim() === '')
        setTextError(prompt.text.trim() === '')
        //