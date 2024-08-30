import { Notification, Prisma } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "next-auth";

type SocketStatus = "disconnected" | "connected";
type ChatConversation = Prisma.ConversationGetPayload<{
    include: {
        Messages: {
            select: {
                id: true;
                content: true;
                createdAt: true;
                updatedAt: true;
                User: {
                    select: {
                        id: true;
                        name: true;
                        email: true;
                        image: true;
                    }
                }
            }, take: 10,
            orderBy: {
                createdAt: "desc";
            },
        }
    }
}>
type ChatState = {
    socketStatus: SocketStatus;
    loading: boolean;
    user: User | null;
    conversations: ChatConversation[];
    notification: Notification[];
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
        }
    },
});

export const { setSocketStatus, initSocket, notification } = chatSlice.actions;
export default chatSlice.reducer;