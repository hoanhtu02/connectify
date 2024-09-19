"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "../message/MessageItem";
import { ChatMessage } from "@prisma/client";
import { useAppSelector } from "@/lib/hooks";

function MainChatBox() {
  const { user, isTyping } = useAppSelector((state) => state.chat);

  const data: ChatMessage[] = [
    {
      id: "1",
      senderId: user?.id!,
      conversationId: "1234123",
      content: "this is a simple text",
      messageType: "IMAGE",
      SenderMessage: {
        id: user?.id!,
        name: user?.name!,
        image: user?.image!,
        email: user?.email!,
      },
      Attachments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "SENT",
    },
  ];
  return (
    <ScrollArea className="p-4 pb-2 flex-grow relative">
      <div className="h-full flex flex-col">
        {data.map((m) => (
          <MessageItem key={m.id} message={m} />
        ))}
        {isTyping && (
          <div className="flex items-center absolute bottom-2 left-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image!} alt="Bot" />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <div className="bg-muted p-3 rounded-lg">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

export default MainChatBox;
