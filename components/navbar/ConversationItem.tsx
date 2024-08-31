import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChatConversation } from "@prisma/client";
import { Ellipsis, Pin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAppSelector } from "@/lib/hooks";
type ConversationItemProps = {
  readonly conversation: ChatConversation;
};

function ConversationItem({ conversation }: ConversationItemProps) {
  const { user } = useAppSelector((state) => state.chat);
  const friend = conversation.Participants.find(
    (p) => p.User.id !== user?.id
  )?.User;
  const title = conversation.title ?? friend?.name;
  const conversationPhoto =
    `https://ui-avatars.com/api/?background=random&name=` + title;
  return (
    <div className="hover:bg-slate-50  py-3 px-2 flex gap-6">
      <Link href="#" className="flex items-center  gap-4 flex-grow">
        <Avatar>
          <AvatarImage src={conversationPhoto} alt={`@${title}`} />
          <AvatarFallback>{title?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className=" font-semibold leading-none text-sm">{title}</p>
          <span className="text-sm leading-none text-gray-500 truncate max-w-60">
            {conversation.Messages.at(0)?.content ??
              "No messages yet, click to start..."}
          </span>
        </div>
      </Link>
      <div className="flex flex-col justify-between gap-1">
        <Button size="icon" className="w-6 h-6" variant="ghost">
          <Ellipsis size={12} className="cursor-pointer" />
        </Button>
        <Button size="icon" className="w-6 h-6" variant="ghost">
          <Pin size={12} className="cursor-pointer" />
        </Button>
      </div>
    </div>
  );
}

export default ConversationItem;
