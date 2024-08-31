import FriendItem from "@/components/friend-search/FriendItem";
import ListConversation from "@/components/navbar/ListConversation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { responseRequestFriend } from "@/lib/features/user/userSlice";

function TabFriends() {
  const { friends } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  return (
    <ListConversation
      render={() =>
        friends.length > 0 ? (
          friends.map((f) => {
            const friend = f.Receiver.id === user?.id ? f.Sender : f.Receiver;
            return (
              <FriendItem
                key={friend.id}
                user={friend}
                position="horizontal"
                renderButtonAction={() => {
                  return (
                    <Button
                      variant="destructive"
                      size="sm"
                      className="ml-auto"
                      onClick={() =>
                        dispatch(
                          responseRequestFriend({ isAccept: false, friend: f })
                        )
                      }
                    >
                      Remove
                    </Button>
                  );
                }}
              />
            );
          })
        ) : (
          <p className="text-center text-sm text-gray-500">
            You not have any friend
          </p>
        )
      }
    />
  );
}

export default TabFriends;
