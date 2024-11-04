import { initSocket, loadMessage, sendMessage, setConversations, setMessageConversation, setSocketStatus } from "@/lib/features/chat/chatSlice";
import { searchFriend, sendRequestFriend, setUserSearchResult, setUserFriend, responseRequestFriend, setFriendRequestsReceived, setFriendRequestSenders } from "@/lib/features/user/userSlice";
import { RootState } from "@/lib/store";
import { SocketEvent } from "@/enums";
import { Middleware, Store } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { User } from "next-auth";
import { ChatConversation } from "@prisma/client";
const { INIT_STATE,
    USER_SEARCH_FRIEND,
    SEARCH_FRIEND_RESULT,
    SEND_REQUEST_FRIEND,
    RECEIVE_REQUEST_FRIEND,
    RESPONSE_REQUEST_FRIEND,
    MESSAGE_LOAD
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
                // get search friend result
                socket.on(SEARCH_FRIEND_RESULT, (users) => {
                    store.dispatch(setUserSearchResult(users));
                });
                // get friend request
                socket.on(RECEIVE_REQUEST_FRIEND, (friend) => {
                    const friends = store.getState().user.friendRequestsReceived;
                    store.dispatch(setFriendRequestsReceived([...friends, friend]));
                })
                // get send request friend
                socket.on(SEND_REQUEST_FRIEND, (friend) => {
                    const friends = store.getState().user.friendRequestSenders;
                    store.dispatch(setFriendRequestSenders([...friends, friend]));
                })
                // get response request friend
                socket.on(RESPONSE_REQUEST_FRIEND, (isAccept, friend, conversation) => {
                    handleResponseRequestFriend(store, isAccept, friend, conversation);
                })
                // get message when user scroll to top
                socket.on(MESSAGE_LOAD, (conversationId, total, page, messages) => {
                    store.dispatch(setMessageConversation({ conversationId, messages, total, page }))
                })
                socket.on("error", (error) => {
                    console.error(error);
                });
            }
        }
        if (searchFriend.match(action) && socket) {
            socket.emit(USER_SEARCH_FRIEND, action.payload);
        }
        if (sendRequestFriend.match(action) && socket) {
            socket.emit(SEND_REQUEST_FRIEND, action.payload.id);
        }
        if (responseRequestFriend.match(action) && socket) {
            socket.emit(RESPONSE_REQUEST_FRIEND, action.payload);
        }
        if (loadMessage.match(action) && socket) {
            const { conversationId, total, page } = action.payload
            socket.emit(MESSAGE_LOAD, conversationId, total, page)
        }
        next(action);
    };
};
export default socketMiddleware;
/**
 * This function handle response request friend
 * @param store the store of redux
 * @param isAccept stand for accept or decline friend request
 * @param friend the user who send friend request
 * @param conversation the conversation between user and friend
 */
const handleResponseRequestFriend = (store: any, isAccept: boolean, friend: User, conversation: ChatConversation) => {
    const states = store.getState();
    const friends = states.user.friends;
    const conversations = states.chat.conversations;
    const friendRequestsReceived = states.user.friendRequestsReceived.filter((u: User) => u.id !== friend.id);
    const friendRequestSenders = states.user.friendRequestSenders.filter((u: User) => u.id !== friend.id);
    if (isAccept) {
        store.dispatch(setUserFriend([...friends, friend]));
        store.dispatch(setConversations([...conversations, conversation]));
    } else {
        store.dispatch(setUserFriend(friends.filter((u: User) => u.id !== friend.id)))
    }
    store.dispatch(setFriendRequestsReceived(friendRequestsReceived));
    store.dispatch(setFriendRequestSenders(friendRequestSenders));
}