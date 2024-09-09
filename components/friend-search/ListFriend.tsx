import { ScrollArea } from "@/components/ui/scroll-area";
import FriendResultItem from "@/components/friend-search/FriendResultItem";
import { useAppSelector } from "@/lib/hooks";
import LoadingData from "@/components/loading/LoadingData";
import ListConversation from "../navbar/ListConversation";

function ListFriend() {
  const { userResultSearch, loading } = useAppSelector((state) => state.user);
  return (
    <ScrollArea className="max-h-64 mt-2">
      {loading ? (
        <LoadingData />
      ) : (
        <ListConversation
          render={() => (
            <>
              {userResultSearch.length === 0 && (
                <p className="text-muted-foreground text-center">
                  No friend found
                </p>
              )}
              {userResultSearch.map((user) => (
                <FriendResultItem key={user.id} user={user} />
              ))}
            </>
          )}
        />
      )}
    </ScrollArea>
  );
}

export default ListFriend;
