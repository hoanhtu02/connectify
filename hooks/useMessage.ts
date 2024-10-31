import { api } from "@/utils/api"
import { ChatMessageItem } from "@prisma/client"
import { useCallback } from "react"

function useMessage(message: ChatMessageItem) {
    const createMessage = useCallback(async () => {
        api.post("/api/chat/message", message)
    }, [])
    const updateMessage = useCallback(async () => {
        api.patch("/api/chat/message", message)
    }, [])
    const findMessage = useCallback(async () => {
        api.get(`/api/chat/message/${message.id}`)
    }, [])
    const deleteMessage = useCallback(async () => {
        api.delete(`/api/chat/message/${message.id}`)
    }, [])
    return { createMessage, updateMessage, findMessage, deleteMessage }
}

export default useMessage
