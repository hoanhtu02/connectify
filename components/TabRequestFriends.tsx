import ListConversation from "@/components/navbar/ListConversation";
import RequestFriendItem from "@/components/navbar/RequestFriendItem";
import { useAppSelector } from "@/lib/hooks";

function TabRequestFriends() {
  const { friendRequestsReceived } = useAppSelector((state) => state.user);
  return (
    <ListConversation
      render={() =>
        friendRequestsReceived.length > 0 ? (
          friendRequestsReceived.map((u) => (
            <RequestFriendItem key={u.id} user={u.Sender} />
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">No request found</p>
        )
      }
    />
  );
}

export default TabRequestFriends;
