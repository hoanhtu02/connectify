import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

import { Conversation, Message, Prisma } from "@prisma/client";
const ConversationDefault = Prisma.validator<Prisma.ConversationDefaultArgs>()({
  include: {
    Messages: true,
    Participants: true,
  },
});
type ConversationResult = Prisma.ConversationGetPayload<
  typeof ConversationDefault
>;

function MainChatBox() {
  return (
    <ScrollArea className="p-4 pb-2 flex-grow relative">
      <div className="h-full flex flex-col">
        <div className={`mb-4 flex justify-start`}>
          <div className={`flex items-end space-x-2 flex-row space-x`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://placehold.co/32x32?text=B`} />
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <div
              className={`max-w-[80%] bg-primary text-primary-foreground p-3 rounded-lg`}
            >
              <p className="text-sm">hiiiiiiiiiiiiiiiiiiiiiiiiiiiii</p>
              <p className="text-xs mt-1 opacity-70">
                {format(Date.now(), "HH:mm")}
              </p>
            </div>
          </div>
        </div>
        <div className={`mb-4 flex justify-end`}>
          <div
            className={`flex items-end space-x-2 flex-row-reverse space-x-reverse`}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://placehold.co/32x32?text=U`} />
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
            <div
              className={`max-w-[70%] bg-primary text-primary-foreground p-3 rounded-lg`}
            >
              <p className="text-sm">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
                in harum voluptatem necessitatibus saepe sequi distinctio
                suscipit voluptate quisquam laboriosam, omnis, tempore neque
                consequatur repellat. Error laudantium nam consequuntur
                laboriosam.
              </p>
              <p className="text-xs mt-1 opacity-70  text-right">
                {format(Date.now(), "HH:mm")}
              </p>
            </div>
          </div>
        </div>
        {true && (
          <div className="flex items-center absolute bottom-2 left-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`/placeholder.svg?height=32&width=32`}
                alt="Bot"
              />
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
        {/* <div ref={messagesEndRef} /> */}
      </div>
    </ScrollArea>
  );
}

export default MainChatBox;
// const renderMessage = (message: Message) => {
//   switch (message.content.type) {
//     case "text":
//       return <p>{message.content.value}</p>;
//     case "attachment":
//       return (
//         <img
//           src={message.content.value}
//           alt="Attachment"
//           className="max-w-xs max-h-40 rounded-lg"
//         />
//       );
//     case "sticker":
//       return <span className="text-4xl">{message.content.value}</span>;
//     default:
//       return null;
//   }
// };
