import HeaderChatBox from "@/components/chatbox/HeaderChatBox";
import MainChatBox from "@/components/chatbox/MainChatBox";
import InputChatBox from "@/components/chatbox/InputChatBox";
import { useAppSelector } from "@/lib/hooks";
import WelcomeBox from "@/components/WelcomeBox";
import LoadingData from "./loading/LoadingData";

function ChatBox() {
  const { selectedConversation, loading } = useAppSelector(
    (state) => state.chat
  );
  function renderConversation() {
    if (loading)
      return (
        <div className="h-full flex items-center justify-center">
          <LoadingData />
        </div>
      );
    if (selectedConversation)
      return (
        <>
          <HeaderChatBox />
          <MainChatBox />
          <InputChatBox />
        </>
      );
    return <WelcomeBox />;
  }
  return <section className="flex flex-col">{renderConversation()}</section>;
}

export default ChatBox;
