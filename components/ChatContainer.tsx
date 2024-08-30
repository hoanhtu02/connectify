"use client";
import NavBar from "@/components/NavBar";
import ChatBox from "@/components/ChatBox";
import { useAppDispatch } from "@/lib/hooks";
import { useCallback, useEffect } from "react";
import { initSocket } from "@/lib/features/chat/chatSlice";
import { getSession } from "next-auth/react";

function ChatContainer() {
  const dispatch = useAppDispatch();
  const init = useCallback(async () => {
    const session = await getSession();
    dispatch(initSocket(session?.user!));
  }, [dispatch]);
  useEffect(() => {
    init();
  }, [dispatch]);
  return (
    <div className="grid grid-cols-[400px_1fr] border mx-10 my-5 flex-grow">
      <NavBar />
      <ChatBox />
    </div>
  );
}

export default ChatContainer;
