import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "next-auth";
import { Button } from "../ui/button";
import { UserPlus } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { FriendData } from "@/lib/features/user/userSlice";
function FriendItem({ user }: { readonly user: User }) {
  const { friendRequestsReceived, friendRequestSenders } = useAppSelector(
    (state) => state.user
  );
  const requestReceived = friendRequestsReceived.find((u) => u.id === user.id);
  const requestSenders = friendRequestSenders.find((u) => u.id === user.id);
  return (
    <div className="grid gap-4 hover:bg-slate-100 py-8 px-2">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user?.image!} alt={user?.name!} />
          <AvatarFallback>{user?.name![0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user?.name!}</p>
        </div>
        {renderButtonAction(requestReceived, requestSenders)}
      </div>
    </div>
  );
}
function renderButtonAction(
  requestReceived: FriendData | undefined,
  requestSenders: FriendData | undefined
) {
  if (requestReceived) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Accept
        </Button>
        <Button variant="destructive" size="sm">
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
        <Button variant="destructive" size="sm">
          Cancel
        </Button>
      </div>
    );
  }
  return (
    <Button variant="outline" size="icon" className="w-8 h-8">
      <UserPlus size={17} />
    </Button>
  );
}

export default FriendItem;
