import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import type { MessageType, Prisma } from "@prisma/client";
type MessageUserSendPayload = Prisma.MessageGetPayload<{
  include: {
    Attachments: {
      select: {
        id: true;
        url: true;
        type: true;
        fileUrl: true;
        thumbUrl: true;
      };
    };
    SenderMessage: {
      select: {
        id: true;
        name: true;
        image: true;
      };
    };
  };
}>;
type AttachmentPerMessage = Prisma.AttachmentGetPayload<{
  select: {
    id: true;
    url: true;
    type: true;
    fileUrl: true;
    thumbUrl: true;
  };
}>;

type MessageItemProps = {
  readonly message: MessageUserSendPayload;
  readonly isCurrentUser: boolean;
};
function MessageItem({ message, isCurrentUser }: MessageItemProps) {
  const { image, name } = message.SenderMessage;
  const { content, createdAt, messageType } = message;
  return (
    <div
      className={`mb-4 flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex items-end space-x-2 flex-row space-x`}>
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
              content || "",
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
  attachments: AttachmentPerMessage[]
) {
  switch (messageType) {
    case "TEXT":
      const isEmoji = content.match(/\p{Emoji}+/gu) && content.length === 2;
      return <p className={isEmoji ? "text-2xl" : "text-sm"}>{content}</p>;
    case "IMAGE":
      return (
        <img
          src={attachments[0].fileUrl}
          alt={content}
          className="max-w-[80%] rounded-lg"
        />
      );
    case "FILE":
      return (
        <a
          href={attachments[0].fileUrl}
          download={content}
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
