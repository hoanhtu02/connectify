"use client";
import HeaderChatBox from "@/components/chatbox/HeaderChatBox";
import ListMessage from "@/components/chatbox/ListMessage";
import InputChatBox from "@/components/chatbox/InputChatBox";

function ChatBox() {
  function renderConversation() {
    return (
      <>
        <HeaderChatBox />
        <ListMessage />
        <InputChatBox />
      </>
    );
  }
  return <section className="flex flex-col">{renderConversation()}</section>;
}

export default ChatBox;
