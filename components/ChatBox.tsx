"use client";
import HeaderChatBox from "@/components/chatbox/HeaderChatBox";
import ListMessage from "@/components/chatbox/ListMessage";
import InputChatBox from "@/components/chatbox/InputChatBox";
import { useAppSelector } from "@/lib/hooks";
import WelcomeBox from "@/components/WelcomeBox";

function ChatBox() {
  const { selectedConversation } = useAppSelector((state) => state.chat);
  function renderConversation() {
    if (selectedConversation)
      return (
        <>
          <HeaderChatBox />
          <ListMessage />
          <InputChatBox />
        </>
      );
    return <WelcomeBox />;
  }
  return <section className="flex flex-col">{renderConversation()}</section>;
}

export default ChatBox;
