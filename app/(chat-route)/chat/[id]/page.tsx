"use client";
import HeaderChatBox from "@/components/chatbox/HeaderChatBox";
import ListMessage from "@/components/chatbox/ListMessage";
import InputChatBox from "@/components/chatbox/InputChatBox";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import LoadingData from "@/components/loading/Loading";
import { useParams } from "next/navigation";
import { useLayoutEffect } from "react";
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
  return <h1 className="text-center">This conversation is not exist!</h1>;
}
