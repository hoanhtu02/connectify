import { Notification, ChatConversation, Message, ChatMessageItem, CreateChatMessage } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "next-auth";

type SocketStatus = "disconnected" | "connected";
type ChatState = {
    socketStatus: SocketStatus;
    loading: boolean;
    user: User | null;
    conversations: ChatConversation[];
    loadingConversations: boolean;
    messageSending: Message[];
    notification: Notification[];
    isTyping: boolean;
};
const initialState: ChatState = {
    socketStatus: "disconnected",
    loading: false,
    loadingConversations: true,
    user: null,
    messageSending: [],
    conversations: [],
    notification: [],
    isTyping: false,
}
const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
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
        processMessage(_state, _action: PayloadAction<Pick<ChatMessageItem, "conversationId" | "content" | "attachments" | "senderId">[]>) { },
        sendMessage(state, action: PayloadAction<CreateChatMessage>) {
            state.conversations = state.conversations.map(c => {
                if (c.id === action.payload.conversationId) {
                    c.Messages.push(action.payload as ChatMessageItem)
                }
                return c
            })
        },
        updateStatusMessage(_state, _action: PayloadAction<ChatMessageItem>) { },
    },
});

export const { setSocketStatus, initSocket, notification, setConversations, setMessageConversation, loadMessage, sendMessage, processMessage } = chatSlice.actions;
export default chatSlice.reducer;