"use client";
import HeaderChatBox from "@/components/chatbox/HeaderChatBox";
import ListMessage from "@/components/chatbox/ListMessage";
import InputChatBox from "@/components/chatbox/InputChatBox";
import { useAppSelector } from "@/lib/hooks";
import LoadingData from "@/components/loading/Loading";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Page() {
  const { id }: { id: string } = useParams();
  const { conversations, loadingConversations } = useAppSelector(
    (state) => state.chat
  );
  const selectedConversation = conversations.some((c) => c.id === id);
  if (loadingConversations) return <LoadingData />;
  if (selectedConversation)
    return (
      <>
        <HeaderChatBox />
        <ListMessage />
        <InputChatBox />
      </>
    );
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="text-center">This conversation is not exist!</h1>
      <Button className="mt-4" size="sm">
        <Link href="/chat">Back</Link>
      </Button>
    </div>
  );
}
