"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import OptionsChatBox from "@/components/chatbox/OptionsChatBox";
import { useAppSelector } from "@/lib/hooks";

function HeaderChatBox() {
  const { user } = useAppSelector((state) => state.chat);
  return (
    <div className="flex gap-4 justify-between items-center px-4 py-3 bg-slate-100 border-b">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src={user?.image!} alt={`@${user?.name}`} />
          <AvatarFallback>{user?.name!.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className=" font-semibold leading-none text-sm">{user?.name}</p>
          <small>3 minutes ago</small>
        </div>
      </div>
      <div>
        <OptionsChatBox />
      </div>
    </div>
  );
}

export default HeaderChatBox;
