import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChatConversation } from "@prisma/client";
import { Ellipsis, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { subDays, formatDistance } from "date-fns";
import Link from "next/link";
type ConversationItemProps = {
  readonly conversation: ChatConversation;
};

function ConversationItem({ conversation }: ConversationItemProps) {
  const { user } = useAppSelector((state) => state.chat);
  const friend = conversation.Participants.find(
    (p) => p.User.id !== user?.id
  )?.User;
  const title = conversation.title ?? friend?.name;
  // const conversationPhoto =
  //   `https://ui-avatars.com/api/?background=random&name=` + title;

  return (
    <div className="hover:bg-primary-foreground p-4 flex gap-6 relative group">
      <div className="absolute top-0 right-0">
        <span className="relative flex h-5 w-5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative rounded-full h-5 w-5 text-center text-[.65rem] leading-5 bg-sky-500">
            9+
          </span>
        </span>
      </div>
      <Link
        href={`/chat/${conversation.id}`}
        className="flex items-center  gap-4 flex-grow cursor-pointer"
      >
        <Avatar>
          <AvatarImage src={friend?.image!} alt={`@${title}`} />
          <AvatarFallback>{title?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className=" font-semibold leading-none text-sm">{title}</p>
          <span className="text-sm leading-none text-primary opacity-60 truncate max-w-60">
            {conversation.Messages.at(0)?.content ??
              "No messages yet, click to start..."}
          </span>
          <span className="text-xs">
            {formatDistance(subDays(new Date(), 3), new Date(), {
              addSuffix: true,
            })}
          </span>
        </div>
      </Link>
      <div className="flex group-hover:visible invisible flex-col justify-between gap-1">
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
