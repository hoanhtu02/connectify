"use client";
import List from "@/components/nav-conversation/List";
import RequestFriendItem from "@/components/nav-conversation/RequestFriendItem";
import { useAppSelector } from "@/lib/hooks";

function TabRequestFriends() {
  const { friendRequestsReceived } = useAppSelector((state) => state.user);
  return (
    <List
      render={() =>
        friendRequestsReceived.length > 0 ? (
          friendRequestsReceived.map((u) => (
            <RequestFriendItem key={u.id} user={u.Sender} />
          ))
        ) : (
          <p className="text-center text-sm text-gray-500 p-4">
            No request found
          </p>
        )
      }
    />
  );
}

export default TabRequestFriends;
