import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Conversation } from "@prisma/client";
import { Ellipsis, Pin, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
type ConversationItemProps = {
  readonly conversation: Conversation & {
    lastMessage?: { content: string; createdAt: Date };
  };
};

function ConversationItem({ conversation }: ConversationItemProps) {
  const conversationPhoto =
    `https://ui-avatars.com/api/?background=random?text=` + conversation.title;
  return (
    <div className="hover:bg-slate-50  py-3 px-2 flex gap-6">
      <Link href="#" className="flex items-center  gap-4 flex-grow">
        <Avatar>
          <AvatarImage src={conversationPhoto} alt={`@${conversation.title}`} />
          <AvatarFallback>{conversation.title.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <p className=" font-semibold leading-none text-sm">
            {conversation.title}
          </p>
          <span className="text-sm leading-none text-gray-500 truncate max-w-60">
            {conversation.lastMessage?.content ??
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
