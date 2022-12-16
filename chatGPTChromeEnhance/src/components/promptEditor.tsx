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
        // setWebResultsError(!prompt.text.includes('{web_results}'))
        setQueryError(!prompt.text.includes('{query}'))
    }, [prompt])

    async function updateList() {
        getSavedPrompts().then(sp => {
            setSavedPrompts(sp)
        })
    }

    const handleSelect = (prompt: Prompt) => {
        setShowErrors(false)
        setPrompt(prompt)
        setDeleteBtnText("delete")
    }


    const handleAdd = () => {
        setShowErrors(false)
        setPrompt({ name: '', text: '' })
        setDeleteBtnText("delete")
        if (nameInputRef.current) {
            nameInputRef.current.focus()
        }
    }

    const handleSave = async () => {
        setShowErrors(true)
        if (nameError || textError || webResultsError || queryError) {
            return
        }

        await savePrompt(prompt)
        await updateList()
    }

    const handleDeleteBtnClick = () => {
        if (deleteBtnText === "delete") {
            setDeleteBtnText("check")
        } else {
            handleDelete()
        }
    }

    const handleDelete = async () => {
        await deletePrompt(prompt)
        updateList()
        handleAdd()
    }


    const nameInputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleInsertText = (text: string) => {
        if (textareaRef.current) {
            const start = textareaRef.current.selectionStart
            const end = textareaRef.current.selectionEnd
            const currentText = textareaRef.current.value
            const newText = currentText.substring(0, start) + text + currentText.substring(end, currentText.length)
            textareaRef.current.setSelectionRange(start + text.length, start + text.length)
            textareaRef.current.focus()

            setPrompt({ ...prompt, text: newText })
        }
    }

    const handleTextareaChange = (e: Event) => {
        const text = (e.target as HTMLTextAreaElement).value
        if (text !== prompt.text) {
            setTextError(false)
            setPrompt({ ...prompt, text })
        }
    }

    const updatePlaceholderButtons = (text: string) => {
        setHasWebResultsPlaceholder(text.includes("{web_results}"))
        setHasQueryPlaceholder(text.includes("{query}"))
    }

    const actionToolbar = (
        <div className={`wcg-mt-4 wcg-flex wcg-flex-row wcg-justify-between
                        ${prompt.uuid === 'default' || prompt.uuid === 'default_en' ? "wcg-hidden" : ""}`}
        >
            <div className="wcg-flex wcg-flex-row wcg-gap-4">
                <TooltipWrapper tip={showErrors ? getTranslation(localizationKeys.placeHolderTips.webResults) : ""}>
                    <button
                        className={`wcg-btn
                        ${showErrors && webResultsError ? "wcg-btn-error" : hasWebResultsPlaceholder ? "wcg-btn-success" : "wcg-btn-warning"}
                        wcg-p-1 wcg-lowercase`}
                        onClick={() => {
                            setWebResultsErro