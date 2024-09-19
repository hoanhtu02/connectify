import NavFilterChat from "@/components/NavConversation";
import ChatBox from "@/components/ChatBox";

function ChatContainer() {
  return (
    <div className="grid grid-cols-[400px_1fr] flex-grow h-full">
      <NavFilterChat />
      <ChatBox />
    </div>
  );
}

export default ChatContainer;
