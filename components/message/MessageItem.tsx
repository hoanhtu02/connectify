"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import type { ChatMessage } from "@prisma/client";
import { Ellipsis, File, FileImage, FileVideo, Heart } from "lucide-react";
import FilePreview from "@/components/message/FilePreview";
import { Button } from "@/components/ui/button";
import useParticipant from "@/hooks/useParticipant";

type MessageItemProps = {
  readonly message: ChatMessage;
};
const css = {
  left: {
    container: "justify-start",
    items: "flex-row",
    icon: " right-[-10px]",
    classContent:
      "from-[#60A9F6] to-[#2A8BF2] rounded-tr-lg drop-shadow-[0_20px_13px_rgba(96,169,246,.03)]",
  },
  right: {
    container: "justify-end",
    icon: " left-[-10px]",
    items: "flex-row-reverse",
    classContent: "dark:bg-[#323337] rounded-tl-lg drop-shadow-xl",
  },
};
function MessageItem({ message }: MessageItemProps) {
  const { user, friend } = useParticipant();
  const direction = message.senderId === user?.id ? "right" : "left";
  const { container, items, classContent, icon } = css[direction];
  const { content, createdAt, messageType, Attachments } = message;
  const isEmoji = content?.match(/\p{Emoji}+/gu) && content.length === 2;

  function renderBaseOnMessageType() {
    switch (messageType) {
      case "IMAGE":
        return <FilePreview name="File name" size={20} icon={<FileImage />} />;
      case "FILE":
        return <FilePreview name="File name" size={20} icon={<File />} />;
      case "VIDEO":
        return <FilePreview name="File name" size={20} icon={<FileVideo />} />;
      default:
        return <></>;
    }
  }
  return (
    <div className={`mb-6 flex ${container} group `}>
      <div className={`flex ${items} gap-2 max-w-[70%] items-center`}>
        {direction === "left" && (
          <Avatar className="h-8 w-8 self-start">
            <AvatarImage src={friend?.image!} />
            <AvatarFallback>{friend?.name}</AvatarFallback>
          </Avatar>
        )}
        <div
          className={`${classContent} bg-gradient-to-r p-4 rounded-b-lg relative`}
        >
          {/* <div
            className={`${icon} cursor-pointer absolute bottom-[-10px] p-1.5 rounded-full bg-primary-foreground shadow-md`}
          >
            <Heart size={12} className="fill-red-500 stroke-red-500" />
          </div> */}
          <div className="text-sm leading-6 mb-2">
            <p className={`${isEmoji && "text-2xl"}`}>{content}</p>
            {renderBaseOnMessageType()}
          </div>
          <p className="text-xs opacity-70">{format(createdAt, "HH:mm")}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="p-1 h-auto invisible group-hover:visible"
        >
          <Ellipsis className="" size={17} />
        </Button>
      </div>
      {/* {direction === "right" && <Check size={17} />} */}
    </div>
  );
}

export default MessageItem;
