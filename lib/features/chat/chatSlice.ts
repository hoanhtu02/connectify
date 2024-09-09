import { Notification, ChatConversation, Message, ChatMessage } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "next-auth";

type SocketStatus = "disconnected" | "connected";
type ChatState = {
    socketStatus: SocketStatus;
    loading: boolean;
    user: User | null;
    conversations: ChatConversation[];
    notification: Notification[];
    selectedConversation?: ChatConversation;
    cachedConversation: string[];
    isTyping: boolean;
};
const initialState: ChatState = {
    socketStatus: "disconnected",
    loading: false,
    user: null,
    conversations: [],
    notification: [],
    cachedConversation: [],
    isTyping: false
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
        },
        setSelectedConversation(state, action: PayloadAction<ChatConversation>) {
            if (state.selectedConversation?.id === action.payload.id) return
            state.selectedConversation = action.payload
            state.loading = true
        },
        loadMessage(state, action: PayloadAction<{ conversationId: string; messages: ChatMessage, total: number; page: number }>) {
            state.loading = true
            state.cachedConversation.push(action.payload.conversationId)
        },
        setMessageConversation(state, action: PayloadAction<{ conversationId: string; messages: ChatMessage, total: number; page: number }>) {
            const { conversationId, messages, total, page } = action.payload
            let conversation: ChatConversation | null = null;
            state.conversations = state.conversations.map(c => {
                if (c.id === conversationId) {
                    c.Messages.push(messages)
                    c.total = total
                    c.page = page
                }
                conversation = c
                return c
            })
            if (conversation) state.selectedConversation = conversation;
            state.cachedConversation.push(conversationId)
            state.loading = false
        },
        sendMessage(_state, _action: PayloadAction<Message>) { },
        updateStatusMessage(_state, _action: PayloadAction<Message>) { }
    },
});

export const { setSocketStatus, initSocket, notification, setConversations, setSelectedConversation, setMessageConversation, loadMessage } = chatSlice.actions;
export default chatSlice.reducer;