"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/lib/hooks";
import { Search } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Bell, Group, UserPlus } from "lucide-react";
import AddFriendDialog from "@/components/nav-conversation/AddFriendDialog";

function TopBar() {
  const { user } = useAppSelector((state) => state.chat);
  return (
    <div className="py-3 px-4 flex w-full h-fit">
      <div className="flex gap-2">
        <AddFriendDialog>
          <Button variant="outline" size="sm" className="px-2">
            <UserPlus size={17} />
          </Button>
        </AddFriendDialog>
        <Button variant="outline" size="sm" className="px-2">
          <Group size={17} />
        </Button>
      </div>
      <Search
        type="text"
        className="min-w-[350px] mx-auto"
        placeholder="Search..."
      />
      <div className="flex gap-4 items-center pr-4">
        <Button variant="ghost" size="sm" className="py-3 px-[.7rem] relative">
          <Bell size={17} />
          <div className="absolute top-0 right-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
        </Button>
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src={user?.image!} alt={`@${user?.name!}`} />
            <AvatarFallback>{user?.name?.at(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="leading-none text-base">{user?.name!}</p>
            <p className="text-sm dark:text-[#818284] text-primary">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
