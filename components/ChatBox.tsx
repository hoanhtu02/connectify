import HeaderChatBox from "@/components/chatbox/HeaderChatBox";
import MainChatBox from "@/components/chatbox/MainChatBox";
import InputChatBox from "@/components/chatbox/InputChatBox";

function ChatBox() {
  return (
    <section className="flex flex-col">
      <HeaderChatBox />
      <MainChatBox />
      <InputChatBox />
    </section>
  );
}

export default ChatBox;
