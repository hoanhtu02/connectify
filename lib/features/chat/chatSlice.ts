import { Notification, ChatConversation, Message, ChatMessageItem, CreateChatMessage } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "next-auth";

type SocketStatus = "disconnected" | "connected";
export interface FileMetadata {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
    uploaded: boolean;
    status: "uploading" | "uploaded" | "failed"
}
type ChatState = {
    socketStatus: SocketStatus;
    loading: boolean;
    user: User | null;
    conversations: ChatConversation[];
    loadingConversations: boolean;
    notification: Notification[];
    isTyping: boolean;
    uploads: FileMetadata[],
};
const initialState: ChatState = {
    socketStatus: "disconnected",
    loading: false,
    loadingConversations: true,
    user: null,
    conversations: [],
    notification: [],
    isTyping: false,
    uploads: [],
}
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setUploads(state, action: PayloadAction<FileMetadata[]>) {
            state.uploads = action.payload;
        },
        setSocketStatus(state, action: PayloadAction<SocketStatus>) {
            state.socketStatus = action.payload;
        },
        initSocket(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        notification(state, action: PayloadAction<Notification>) {
            state.notification.push(action.payload);
        },
        setConversations(state, action: PayloadAction<ChatConversation[]>) {
            state.conversations = action.payload;
            state.loadingConversations = false
        },
        loadMessage(state, _action: PayloadAction<{ conversationId: string; total?: number; page?: number; }>) {
            state.loading = true
        },
        setMessageConversation(state, action: PayloadAction<{ conversationId: string; messages: ChatMessageItem, total: number; page: number }>) {
            const { conversationId, messages, total, page } = action.payload
            state.conversations = state.conversations.map(c => {
                if (c.id === conversationId) {
                    c.Messages.push(messages)
                    c.total = total
                    c.page = page
                }
                return c
            })
            state.loading = false
        },
        receiveMessage(state, action: PayloadAction<ChatMessageItem>) {
            state.conversations.find(c => c.id === action.payload.conversationId)?.Messages.push(action.payload)
        },
        submitMessage(state, action: PayloadAction<{ message: ChatMessageItem, files: File[] }>) {
            state.conversations
                .find(c => c.id === action.payload.message.conversationId)
                ?.Messages.push(action.payload.message)
        },
        sendMessage(_state, _action: PayloadAction<CreateChatMessage>) { },
        updateStatusMessage(_state, _action: PayloadAction<ChatMessageItem>) { },
    },
});

export const { setSocketStatus, initSocket, notification, setConversations, setMessageConversation, loadMessage, submitMessage, receiveMessage, sendMessage, setUploads } = chatSlice.actions;
export default chatSlice.reducer;