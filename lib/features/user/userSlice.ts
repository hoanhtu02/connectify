import { Prisma } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "next-auth";

export type FriendData = Prisma.FriendGetPayload<{ include: { Friend: true } }>
type UserState = {
    isTyping?: boolean;
    userResultSearch: User[];
    friends: User[];
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
        setUserFriend(state, action: PayloadAction<Pick<UserState, "friendRequestSenders" | "friendRequestsReceived" | "friends">>) {
            console.log(action.payload);
            state.friendRequestSenders = action.payload.friendRequestSenders;
            state.friendRequestsReceived = action.payload.friendRequestsReceived;
            state.friends = action.payload.friends;
        },
        setUserSearchResult(state, action: PayloadAction<User[]>) {
            state.userResultSearch = action.payload;
            state.loading = false;
        },
        searchFriend(state) {
            state.loading = true;
        },
        sendRequestFriend(state, action: PayloadAction<FriendData>) {
            state.friendRequestSenders.push(action.payload);
        },
        receiveRequestFriend(state, action: PayloadAction<FriendData>) {
            state.friendRequestsReceived.push(action.payload);
        },
        responseRequestFriend(state, action: PayloadAction<{ isAccept: boolean; user: User }>) {
            const { isAccept, user } = action.payload;
            if (isAccept) {
                state.friends.push(user);
            }
            state.friendRequestsReceived = state.friendRequestsReceived.filter((u) => u.id !== user.id);
        },
    },
});

export const { searchFriend, setUserSearchResult, sendRequestFriend, receiveRequestFriend, setUserFriend, responseRequestFriend } = userSlice.actions;
export default userSlice.reducer;