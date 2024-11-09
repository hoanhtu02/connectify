import { FileUploadContext } from "@/context/FileUploadProvider"
import { api } from "@/utils/api"
import { ChatMessageItem, CreateChatMessage } from "@prisma/client"
import { useCallback, useContext } from "react"

function useMessage() {
    const { setUploads } = useContext(FileUploadContext)
    const createMessage = useCallback(async (message: CreateChatMessage) => {
        try {
            const { data } = await api.post("/api/chat/message", message)
            if (!data) return null
            setUploads((prev) =>
                prev.map((a) => ({
                    ...a,
                    messageId: data.id,
                }))
            );
            return data as ChatMessageItem
        } catch (error) {
            console.error(error)
        }
    }, [])
    const updateMessage = useCallback(async (message: ChatMessageItem) => {
        api.patch("/api/chat/message", message)
    }, [])
    const findMessage = useCallback(async (message: ChatMessageItem) => {
        api.get(`/api/chat/message/${message.id}`)
    }, [])
    const deleteMessage = useCallback(async (message: ChatMessageItem) => {
        api.delete(`/api/chat/message/${message.id}`)
    }, [])
    return { createMessage, updateMessage, findMessage, deleteMessage }
}

export default useMessage
