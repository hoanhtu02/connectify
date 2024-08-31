import { Prisma } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "next-auth";
const userSelect = {
    id: true,
    name: true,
    email: true,
    image: true
}
export type FriendData = Prisma.FriendGetPayload<{
    include: {
        Receiver: {
            select: typeof userSelect
        },
        Sender: {
            select: typeof userSelect
        }
    }
}>
type UserState = {
    isTyping?: boolean;
    userResultSearch: User[];
    friends: FriendData[];
    friendRequestSenders: FriendData[];
    friendRequestsReceived: FriendData[];
    loading: boolean;
};
const initialState: UserState = {
    userResultSearch: [],
    loading: false,
    friends: [],
    friendRequestSenders: [],
    friendRequestsReceived: [],
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserFriend(state, action: PayloadAction<FriendData[]>) {
            state.friends = action.payload;
        },
        setFriendRequestSenders(state, action: PayloadAction<FriendData[]>) {
            state.friendRequestSenders = action.payload;
        },
        setFriendRequestsReceived(state, action: PayloadAction<FriendData[]>) {
            state.friendRequestsReceived = action.payload;
        },
        setUserSearchResult(state, action: PayloadAction<User[]>) {
            state.userResultSearch = action.payload;
            state.loading = false;
        },
        searchFriend(state) {
            state.loading = true;
        },
        sendRequestFriend(_state, _action: PayloadAction<User>) { },
        receiveRequestFriend(_state, _action: PayloadAction<FriendData>) { },
        responseRequestFriend(_state, _action: PayloadAction<{ isAccept: boolean; friend: FriendData }>) { },
    },
});

export const { searchFriend, setUserSearchResult, sendRequestFriend, receiveRequestFriend, setUserFriend, responseRequestFriend, setFriendRequestSenders, setFriendRequestsReceived } = userSlice.actions;
export default userSlice.reducer;