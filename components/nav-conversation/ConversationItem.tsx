import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChatConversation } from "@prisma/client";
import { Ellipsis, Pin } from "lucide-react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSelectedConversation } from "@/lib/features/chat/chatSlice";
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

  const dispatch = useAppDispatch();
  return (
    <div className="hover:bg-primary-foreground  px-2 py-1 flex gap-6">
      <a
        href={undefined}
        className="flex items-center  gap-4 flex-grow cursor-pointer"
        onClick={() => dispatch(setSelectedConversation(conversation))}
      >
        <Avatar>
          <AvatarImage src={conversationPhoto} alt={`@${title}`} />
          <AvatarFallback>{title?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className=" font-semibold leading-none text-sm">{title}</p>
          <span className="text-sm leading-none text-primary opacity-60 truncate max-w-60">
            {conversation.Messages.at(0)?.content ??
              "No messages yet, click to start..."}
          </span>
        </div>
      </a>
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
