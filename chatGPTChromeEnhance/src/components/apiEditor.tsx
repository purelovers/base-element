import { h } from 'preact'
import { useState, useEffect, useRef, useLayoutEffect } from 'preact/hooks'
import { getTranslation, localizationKeys } from 'src/util/localization'
import { deleteAPI, getDefaultAPI, getsavedAPIs, API, saveAPI } from 'src/util/apiManager'
const APIEditor = (
) => {
    const [savedAPIS, setSavedAPIS] = useState<API[]>([])
    const [api, setAPI] = useState<API>(getDefaultAPI())
    const [deleteBtnText, setDeleteBtnText] = useState("delete")
    const [showErrors, setShowErrors] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [textError, setTextError] = useState(false)

    useLayoutEffect(() => {
        updateSavedAPIS()
    }, [])

    const updateSavedAPIS = async () => {
        const apis = await getsavedAPIs()
        setSavedAPIS(apis)
        if (api.uuid === 'default') {
            setAPI(apis[0])
        }
    }

    useEffect(() => {
        setNameError(api.name.trim() === '')
        setTextError(api.text.trim() === '')
    }, [api])

    async function updateList() {
        getsavedAPIs().then(sp => {
            setSavedAPIS(sp)
        })
    }

    const handleSelect = (api:API) => {
        setShowErrors(false)
        setAPI(api)
        setDeleteBtnText("delete")
    }

    const handleAdd = () => {
        setShowErrors(false)
        setAPI({ name: '', text: '' })
        setDeleteBtnText("delete")
        if (nameInputRef.current) {
            nameInputRef.current.focus()
        }
    }

    const handleSave = async () => {
        setShowErrors(true)
        if (nameError || textError) {
            return
        }
        await saveAPI(api)
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
        await deleteAPI(api)
        updateList()
        handleAdd()
    }

    const nameInputRef = useRef<HTMLInputElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const handleTextareaChange = (e: Event) => {
        const text = (e.target as HTMLTextAreaElement).value
        if (text !== api.text) {
            setTextError(false)
            setAPI({ ...api, text })
        }
    }
    const actionToolbar = (
        <div className={`wcg-mt-4 wcg-flex wcg-flex-row wcg-justify-between
                        ${