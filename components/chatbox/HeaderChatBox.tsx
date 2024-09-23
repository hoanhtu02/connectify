"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import OptionsChatBox from "@/components/chatbox/OptionsChatBox";
import useParticipant from "@/hooks/useParticipant";

function HeaderChatBox() {
  const { friend } = useParticipant();
  return (
    <div className="flex gap-4 justify-between items-center px-4 py-2  border-b">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src={friend?.image!} alt={`@${friend?.name}`} />
          <AvatarFallback>{friend?.name!.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className=" font-semibold leading-none text-sm">{friend?.name}</p>
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
