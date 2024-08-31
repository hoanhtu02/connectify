import type { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  FriendData,
  responseRequestFriend,
  sendRequestFriend,
} from "@/lib/features/user/userSlice";
import FriendItem from "@/components/friend-search/FriendItem";
function FriendResultItem({ user }: { readonly user: User }) {
  const { friendRequestsReceived, friendRequestSenders, friends } =
    useAppSelector((state) => state.user);
  const requestReceived = friendRequestsReceived.find(
    (u) => u.senderId === user.id
  );
  const requestSenders = friendRequestSenders.find(
    (u) => u.receiverId === user.id
  );
  const friend = friends.find(
    (u) => u.receiverId === user.id || u.senderId === user.id
  );

  const dispatch = useAppDispatch();
  function handleResponse(isAccept: boolean, friend: FriendData) {
    dispatch(responseRequestFriend({ isAccept, friend }));
  }
  function renderButtonAction() {
    if (requestReceived) {
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleResponse(true, requestReceived)}
          >
            Accept
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleResponse(false, requestReceived)}
          >
            Decline
          </Button>
        </div>
      );
    }
    if (requestSenders) {
      return (
        <div className="flex gap-2">
          <Button variant="outline" disabled size="sm">
            Waiting
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleResponse(false, requestSenders)}
          >
            Cancel
          </Button>
        </div>
      );
    }
    if (friend) {
      return (
        <div className="flex gap-2">
          <Button variant="outline" disabled size="sm">
            You are friend now
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleResponse(false, friend)}
          >
            Remove
          </Button>
        </div>
      );
    }
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => dispatch(sendRequestFriend(user))}
      >
        Request
      </Button>
    );
  }
  return <FriendItem user={user} renderButtonAction={renderButtonAction} />;
}

export default FriendResultItem;
