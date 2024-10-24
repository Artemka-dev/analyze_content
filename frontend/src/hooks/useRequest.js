import { useCallback, useState } from "react";


export function useRequest() {

    const [error, setError] = useState('')

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        try {
            const response = await fetch(import.meta.env.VITE_BASE_API_URL + url, { method, headers, body })
            const json = await response.json()

            if (response.status !== 200) {
                throw new Error('Произошла ошибка')
            }

            return json
        } catch (e) {
            setError(e.message)
            throw e
        }

    }, [])

    return { request, error }
} 