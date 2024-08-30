import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "next-auth";
import { Button } from "@/components/ui/button";

function RequestFriendItem({ user }: { readonly user: User }) {
  return (
    <div className="hover:bg-slate-50  py-3 px-2 flex items-center gap-4">
      <Avatar>
        <AvatarImage src={user?.image!} alt={`@${user?.name}`} />
        <AvatarFallback>{user?.name?.toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <p className=" font-semibold leading-none text-sm">{user?.name}</p>
      </div>
      <div className="ml-auto flex gap-2">
        <Button variant="outline" size="sm">
          Accept
        </Button>
        <Button variant="destructive" size="sm">
          Decline
        </Button>
      </div>
    </div>
  );
}

export default RequestFriendItem;
