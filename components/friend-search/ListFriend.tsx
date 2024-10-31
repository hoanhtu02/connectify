import { ScrollArea } from "@/components/ui/scroll-area";
import FriendResultItem from "@/components/friend-search/FriendResultItem";
import { useAppSelector } from "@/lib/hooks";
import LoadingData from "@/components/loading/Loading";
import List from "../nav-conversation/List";

function ListFriend() {
  const { userResultSearch, loading } = useAppSelector((state) => state.user);
  return (
    <ScrollArea className="max-h-64 my-4">
      {loading ? (
        <LoadingData />
      ) : (
        <List
          render={() => (
            <>
              {userResultSearch.length === 0 && (
                <p className="text-muted-foreground text-center my-4">
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