"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "../message/MessageItem";
import { ChatMessageItem } from "@prisma/client";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { loadMessage } from "@/lib/features/chat/chatSlice";
import { useLayoutEffect } from "react";
import { useParams } from "next/navigation";

function ListMessage() {
  const { user, isTyping, conversations } = useAppSelector(
    (state) => state.chat
  );
  const { id } = useParams();
  // const dispatch = useAppDispatch();
  // useLayoutEffect(() => {
  //   dispatch(loadMessage({ conversationId: id }));
  // }, []);
  const data = conversations.find((c) => c.id === id)?.Messages;

  return (
    <ScrollArea className="p-4 pb-2 flex-grow relative">
      <div className="h-full flex flex-col">
        {data?.map((m) => (
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

export default ListMessage;
