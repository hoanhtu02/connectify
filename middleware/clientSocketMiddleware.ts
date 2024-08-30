import { initSocket, setSocketStatus } from "@/lib/features/chat/chatSlice";
import { searchFriend, sendRequestFriend, receiveRequestFriend, setUserSearchResult, setUserFriend, responseRequestFriend } from "@/lib/features/user/userSlice";
import { RootState } from "@/lib/store";
import { SocketEvent } from "@/enums";
import { Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { FriendStatus } from "@prisma/client";
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

                socket.on("initState", ({ friends, pendingAcceptFriends }) => {
                    console.log(friends, pendingAcceptFriends);
                    const { acceptedFriends, friendRequestsReceived } = filterFriends(friends)
                    store.dispatch(setUserFriend({ friends: acceptedFriends, friendRequestSenders: friendRequestsReceived, friendRequestsReceived: pendingAcceptFriends }));
                })

                socket.on(SocketEvent.SEARCH_FRIEND_RESULT, (users) => {
                    store.dispatch(setUserSearchResult(users));
                });
                socket.on(SocketEvent.RECEIVE_REQUEST_FRIEND, (friend,) => {
                    store.dispatch(receiveRequestFriend(friend));
                })
                socket.on("error", (error) => {
                    console.error(error);
                });
            }
        }
        if (searchFriend.match(action) && socket) {
            socket.emit(SocketEvent.USER_SEARCH_FRIEND, action.payload);
        }
        if (sendRequestFriend.match(action) && socket) {
            socket.emit(SocketEvent.SEND_REQUEST_FRIEND, action.payload.id);
        }
        if (responseRequestFriend.match(action) && socket) {
            socket.emit(SocketEvent.RESPONSE_REQUEST_FRIEND, action.payload);
        }
        next(action);
    };
};
export default socketMiddleware;
function filterFriends(friends: any) {
    return friends.reduce((acc: any, { Friend, status }: any) => {
        if (status === FriendStatus.ACCEPTED) {
            acc.acceptedFriends.push(Friend);
        } else if (status === FriendStatus.PENDING) {
            acc.friendRequestsReceived.push(Friend);
        }
        return acc;
    }, { acceptedFriends: [], friendRequestsReceived: [] });
}