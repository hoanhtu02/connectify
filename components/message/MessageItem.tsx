"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import type { Attachment, ChatMessageItem, Message } from "@prisma/client";
import { Ellipsis, File, FileImage, FileVideo, Heart } from "lucide-react";
import FilePreview from "@/components/message/FilePreview";
import { Button } from "@/components/ui/button";
import useParticipant from "@/hooks/useParticipant";
import { use, useCallback, useContext, useEffect } from "react";
import { FileUploadContext } from "@/context/FileUploadProvider";
import useFileUpload from "@/hooks/useFileUpload";
import LoadingData from "../loading/Loading";
import { Progress } from "../ui/progress";
import useMessage from "@/hooks/useMessage";

type MessageItemProps = {
  readonly message: ChatMessageItem;
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
  const { container, items, classContent } = css[direction];
  const { content, createdAt, file } = message;
  const isEmoji = content?.match(/\p{Emoji}+/gu) && content.length === 2;
  const { upload, status, progressUpload } = useFileUpload();
  const handleCreateMessage = useCallback(async () => {
    let attachment: Attachment | undefined | null = null;
    if (file) {
      attachment = await upload(file, message.id);
      if (!attachment) return;
      message.attachments.push(attachment.id);
    }
  }, []);

  useEffect(() => {
    handleCreateMessage();
  }, []);

  return (
    <div className={`mb-6 flex ${container} group `}>
      <div className={`max-w-[70%]`}>
        <div className={`flex ${items} gap-2 items-center w-full relative`}>
          {status === "uploading" && (
            <div className="absolute w-full h-full top-0 left-0 bg-white/50">
              <LoadingData />
              <Progress value={progressUpload} />
            </div>
          )}
          {direction === "left" && (
            <Avatar className="h-8 w-8 self-start">
              <AvatarImage src={friend?.image!} />
              <AvatarFallback>{friend?.name}</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`${classContent} bg-gradient-to-r p-4 rounded-b-lg relative`}
          >
            <div className="text-sm leading-6 mb-2">
              <p className={`${isEmoji && "text-2xl"}`}>{content}</p>
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
      </div>
      {/* {direction === "right" && <Check size={17} />} */}
    </div>
  );
}

export default MessageItem;
