import { initSocket, setConversations, setSocketStatus } from "@/lib/features/chat/chatSlice";
import { setUserFriend, setFriendRequestsReceived, setFriendRequestSenders } from "@/lib/features/user/userSlice";
import { RootState } from "@/lib/store";
import { SocketEvent } from "@/enums";
import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { handleReceivedResponseFriendSocket, handleSubmitResponseFriendSocket } from "@/middleware/socket/chunks/friend";
import { handleReceivedResponseMessageSocket, handleSubmitResponseMessageSocket } from "@/middleware/socket/chunks/message";
const { INIT_STATE,
} = SocketEvent
const socketMiddleware: Middleware<{}, RootState> = (store) => {
    let socket: Socket | null = null;
    return (next) => (action) => {
        if (initSocket.match(action)) {
            if (!socket && typeof window !== "undefined") {
                socket = io({
                    auth: {
                        token: action.payload,
                    }
                });
                socket.on("connect", () => {
                    store.dispatch(setSocketStatus("connected"));
                });
                socket.on("disconnect", () => {
                    store.dispatch(setSocketStatus("disconnected"));
                });

                // Init state by getting friends, friendRequestsReceived, friendRequestSenders, conversations
                socket.on(INIT_STATE, ({ friends, friendRequestsReceived, friendRequestSenders, conversations }) => {
                    store.dispatch(setUserFriend(friends));
                    store.dispatch(setFriendRequestsReceived(friendRequestsReceived));
                    store.dispatch(setFriendRequestSenders(friendRequestSenders));
                    store.dispatch(setConversations(conversations));
                })
                handleReceivedResponseFriendSocket(socket, store);
                handleReceivedResponseMessageSocket(socket, store);
                socket.on("error", (error) => {
                    console.error(error);
                });
            }
        }
        handleSubmitResponseFriendSocket(action, socket);
        handleSubmitResponseMessageSocket(action, socket);
        next(action);
    };
};
export default socketMiddleware;
