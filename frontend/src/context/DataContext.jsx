import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useRequest } from "../hooks/useRequest"

const DataContext = createContext()

export const useData = () => {
    return useContext(DataContext)
}

export const DataProvider = ({ children }) => {

    const file = useRef()
    const { request, error } = useRequest()

    const [process, setProcess] = useState({})
    const [content, setContent] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (process.id) {
            const inverval = setInterval(() => {
                request(`/api/process/${process.id}/`, 'GET').then(json => {
                    if (json.process.status === 'COMPLETE') {
                        setContent(JSON.parse(json.process.content))
                        setLoading(false)
                        clearInterval(inverval)
                    }
                }).catch(_ => {
                    setLoading(false)
                    clearInterval(inverval)
                })
            }, 1000)
        }
    }, [process])

    const submitHandler = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append('file', file.current.files[0])

        const json = await request('/api/upload', 'POST', formData)
        setProcess(json.process)
        setLoading(true)

        file.current.value = null
    }

    return (
        <DataContext.Provider value={{ file, submitHandler, content, loading, error, process }}>
            { children }
        </DataContext.Provider>
    )
}