"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import type {
  Attachment,
  ChatMessageItem,
  CreateChatMessage,
  Message,
} from "@prisma/client";
import { Ellipsis } from "lucide-react";
import FilePreview from "@/components/message/FilePreview";
import { Button } from "@/components/ui/button";
import useParticipant from "@/hooks/useParticipant";
import { useCallback, useEffect, useState } from "react";
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
  const { content, createdAt } = message;
  const isEmoji = content?.match(/\p{Emoji}+/gu) && content.length === 2;
  const { upload, status, progressUpload } = useFileUpload();
  const { createMessage } = useMessage(message);
  // sending file and update the message
  const handleCreateMessage = useCallback(async () => {
    const file = message.file as File[];
    if (message.id) return;
    createMessage();
    if (file.length) {
      file.forEach(async (f) => {
        const attachment = await upload(f, message.id);
        if (!attachment) return;
        if (Array.isArray(message.attachments)) {
          message.attachments.push(attachment.id);
        }
      });
    }
  }, []);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    // random progress
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 0));
    }, 1000);

    if (progress === 100) clearInterval(interval);
    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    handleCreateMessage();
  }, []);

  return (
    <div className={`mb-6 flex ${container} group `}>
      <div className={`max-w-[70%]`}>
        <div className={`flex ${items} gap-2 items-center w-full `}>
          {direction === "left" && (
            <Avatar className="h-8 w-8 self-start">
              <AvatarImage src={friend?.image!} />
              <AvatarFallback>{friend?.name}</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`${classContent} bg-gradient-to-r px-4 py-3 rounded-b-lg rounded-tl-lg relative`}
          >
            {status === "uploading" && (
              <div className="absolute flex flex-col w-full h-full top-0 rounded-b-lg left-0 bg-white/50 rounded-tl-lg  z-10 overflow-hidden">
                <LoadingData />
                <Progress value={progress} className="h-1 bg-white " />
              </div>
            )}
            <div className="text-sm leading-6">
              <p
                className={`${isEmoji && "text-2xl"}`}
                dangerouslySetInnerHTML={{ __html: content! }}
              ></p>
            </div>
            <p className="text-xs opacity-70 mt-2">
              {format(createdAt ?? new Date(), "HH:mm")}
            </p>
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
