"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import OptionsChatBox from "@/components/chatbox/OptionsChatBox";
import { useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";

function HeaderChatBox() {
  const { user, conversations } = useAppSelector((state) => state.chat);
  const { id }: { id: string } = useParams();
  const selectedConversation = conversations.find((c) => c.id === id);
  const friend = selectedConversation?.Participants.find(
    (u) => u.User.id !== user?.id
  )?.User;
  return (
    <div className="flex gap-4 justify-between items-center px-4 py-3  border-b">
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
