
const {
    SEARCH_FRIEND_RESULT,
    SEND_REQUEST_FRIEND,
    RECEIVE_REQUEST_FRIEND,
    RESPONSE_REQUEST_FRIEND, USER_SEARCH_FRIEND
} = SocketEvent
import { SocketEvent } from "@/enums";
import { setConversations } from "@/lib/features/chat/chatSlice";
import { setUserSearchResult, setFriendRequestsReceived, setFriendRequestSenders, setUserFriend, responseRequestFriend, searchFriend, sendRequestFriend } from "@/lib/features/user/userSlice";
import { AppDispatch, RootState, store } from "@/lib/store";
import { ChatConversation } from "@prisma/client";
import { MiddlewareAPI, UnknownAction } from "@reduxjs/toolkit";
import { User } from "next-auth";
import { Socket } from "socket.io-client";
export function handleReceivedResponseFriendSocket(socket: Socket, store: MiddlewareAPI<AppDispatch, RootState>) {
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
}


export function handleSubmitResponseFriendSocket(action: any, socket: Socket | null) {

    if (searchFriend.match(action) && socket) {
        socket.emit(USER_SEARCH_FRIEND, action.payload);
    }
    if (sendRequestFriend.match(action) && socket) {
        socket.emit(SEND_REQUEST_FRIEND, action.payload.id);
    }
    if (responseRequestFriend.match(action) && socket) {
        socket.emit(RESPONSE_REQUEST_FRIEND, action.payload);
    }
}

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