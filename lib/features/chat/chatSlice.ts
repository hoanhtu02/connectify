import { Notification, ChatConversation } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "next-auth";

type SocketStatus = "disconnected" | "connected";
type ChatState = {
    socketStatus: SocketStatus;
    loading: boolean;
    user: User | null;
    conversations: ChatConversation[];
    notification: Notification[];
    selectedConversation?: ChatConversation
};
const initialState: ChatState = {
    socketStatus: "disconnected",
    loading: false,
    user: null,
    conversations: [],
    notification: [],
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
        }
    },
});

export const { setSocketStatus, initSocket, notification, setConversations } = chatSlice.actions;
export default chatSlice.reducer;