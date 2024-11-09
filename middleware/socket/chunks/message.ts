import { AppDispatch, RootState } from "@/lib/store";
import { MiddlewareAPI } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { setMessageConversation, receiveMessage, setSubmitMessage, loadMessage, submitMessage, sendMessage } from "@/lib/features/chat/chatSlice";
import { SocketEvent } from "@/enums";
const { MESSAGE_LOAD, MESSAGE_RECEIVE, MESSAGE_SEND, MESSAGE_SUBMIT } = SocketEvent
export function handleReceivedResponseMessageSocket(socket: Socket, store: MiddlewareAPI<AppDispatch, RootState>) {
    // get message when user scroll to top
    socket.on(MESSAGE_LOAD, (conversationId, total, page, messages) => {
        store.dispatch(setMessageConversation({ conversationId, messages, total, page }))
    })
    socket.on(MESSAGE_RECEIVE, (message) => {
        store.dispatch(receiveMessage(message));
    });
    socket.on(MESSAGE_SEND, (message) => {
        store.dispatch(receiveMessage(message));
    });
    socket.on(MESSAGE_SUBMIT, (message) => {
        store.dispatch(setSubmitMessage(message));
    });
}


export function handleSubmitResponseMessageSocket(action: any, socket: Socket | null) {
    if (loadMessage.match(action) && socket) {
        const { conversationId, total, page } = action.payload
        socket.emit(MESSAGE_LOAD, conversationId, total, page)
    }
    if (submitMessage.match(action) && socket) {
        socket.emit(MESSAGE_SUBMIT, action.payload)
    }
    if (sendMessage.match(action) && socket) {
        const { message, to } = action.payload
        socket.emit(MESSAGE_SEND, message, to)
    }
}
