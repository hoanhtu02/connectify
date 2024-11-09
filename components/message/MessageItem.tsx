"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { ChatMessageItem } from "@prisma/client";
import { Ellipsis } from "lucide-react";
import FilePreview from "@/components/message/FilePreview";
import { Button } from "@/components/ui/button";
import useParticipant from "@/hooks/useParticipant";
import { useCallback, useContext, useEffect, useState } from "react";
import useMessage from "@/hooks/useMessage";
import { v4 } from "uuid";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { sendMessage } from "@/lib/features/chat/chatSlice";
import { FileUploadContext, FileUpload } from "@/context/FileUploadProvider";
import { URL } from "url";
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
  const { friends, user } = useParticipant();
  const friend = friends?.at(0) || null;
  const direction = message.senderId === user?.id ? "right" : "left";
  const { container, items, classContent } = css[direction];
  const { content } = message;
  const { uploads, setUploads } = useContext(FileUploadContext);
  const [messageUpload, setMessageUpload] = useState<FileUpload[]>(uploads);
  const isEmoji = content?.match(/\p{Emoji}+/gu) && content.length === 2;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (uploads.every((a) => a.status === "completed")) {
      const newMessage = { ...message };
      uploads.forEach((a) => {
        newMessage.attachments?.push(a.attachmentId!);
        newMessage.MessageAttachments?.push(a.Attachment!);
      });
      dispatch(
        sendMessage({ message: newMessage, to: friends.map((a) => a.id) })
      );
      setUploads((prev) => {
        prev.forEach((a) => {
          URL.revokeObjectURL(a.preview!);
        });
        return [];
      });
    }
  }, [messageUpload]);
  return (
    <div className={`mb-6 flex ${container} group `}>
      <div className={`max-w-[70%]`}>
        {content && (
          <div className={`flex ${items} gap-2 items-center w-full`}>
            {direction === "left" && friend && (
              <Avatar className="h-8 w-8 self-start">
                <AvatarImage src={friend?.image!} />
                <AvatarFallback>{friend?.name}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`${classContent} bg-gradient-to-r px-4 py-3 rounded-b-lg rounded-tl-lg relative`}
            >
              <div className="text-sm leading-6">
                <p
                  className={`${isEmoji && "text-2xl"}`}
                  dangerouslySetInnerHTML={{ __html: content }}
                ></p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="p-1 h-auto invisible group-hover:visible"
            >
              <Ellipsis className="" size={17} />
            </Button>
          </div>
        )}
        {(!!uploads?.length || !!message?.MessageAttachments) && (
          <div
            className={`grid grid-cols-4 gap-1 max-w-fit ml-auto mt-2 ${classContent} bg-gradient-to-r px-4 py-3 rounded-b-lg rounded-tl-lg relative `}
          >
            {uploads?.map((a, i) => {
              return (
                <FilePreview
                  key={v4()}
                  attachment={null}
                  file={a}
                  messageId={message.id || ""}
                  setMessageUpload={setMessageUpload}
                />
              );
            })}
            {message?.MessageAttachments?.map((a, i) => (
              <FilePreview
                key={v4()}
                attachment={a}
                messageId={message.id}
                file={null}
              />
            ))}
          </div>
        )}
      </div>
      {/* {direction === "right" && <Check size={17} />} */}
    </div>
  );
}

export default MessageItem;
