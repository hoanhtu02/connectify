import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import type { ChatMessage, MessageType, Prisma } from "@prisma/client";
import { useAppSelector } from "@/lib/hooks";

type MessageItemProps = {
  readonly message: ChatMessage;
};
const css = {
  left: {
    container: "justify-start",
    items: "flex-row",
  },
  right: {
    container: "justify-end",
    items: "flex-row-reverse",
  },
};
function MessageItem({ message }: MessageItemProps) {
  const { user } = useAppSelector((state) => state.chat);
  const direction = message.senderId === user?.id ? "right" : "left";
  const { container, items } = css[direction];
  const { image, name } = message.SenderMessage;
  const { content, createdAt, messageType } = message;
  return (
    <div className={`mb-4 flex ${container}`}>
      <div className={`flex ${items} gap-2`}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={image!} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
        <div
          className={`max-w-[80%] bg-primary text-primary-foreground p-3 rounded-lg`}
        >
          <div>
            {renderBaseOnMessageType(
              messageType,
              content ?? "",
              message.Attachments
            )}
          </div>
          <p className="text-xs mt-1 opacity-70">
            {format(createdAt, "HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
}

function renderBaseOnMessageType(
  messageType: MessageType,
  content: string,
  attachments: ChatMessage["Attachments"]
) {
  const isEmoji = content.match(/\p{Emoji}+/gu) && content.length === 2;
  switch (messageType) {
    case "TEXT":
      return <p className={isEmoji ? "text-2xl" : "text-sm"}>{content}</p>;
    case "IMAGE":
      return (
        <img
          src={
            attachments[0]?.fileUrl ??
            "https://ui-avatars.com/api/?background=random&name=Ho%20Tu&size"
          }
          alt={content}
          className="max-h-[250px] rounded-lg"
        />
      );
    case "FILE":
      return (
        <a
          href={
            attachments[0].fileUrl ||
            "https://ui-avatars.com/api/?background=random&name=Ho%20Tu"
          } 
          download
          className="text-primary underline"
        >
          {content}
        </a>
      );
    case "VIDEO":
      return (
        <video
          src={attachments[0].fileUrl}
          controls
          className="max-w-[80%] rounded-lg"
        />
      );
    default:
      return null;
  }
}

export default MessageItem;
