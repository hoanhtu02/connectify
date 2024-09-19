"use client";
import { useAppDispatch } from "@/lib/hooks";
import React, { useCallback, useEffect } from "react";
import { initSocket } from "@/lib/features/chat/chatSlice";
import { getSession } from "next-auth/react";
function ChatRouteContainer({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const init = useCallback(async () => {
    const session = await getSession();
    dispatch(initSocket(session?.user!));
  }, [dispatch]);
  useEffect(() => {
    init();
  }, [dispatch]);
  return <>{children}</>;
}

export default ChatRouteContainer;
