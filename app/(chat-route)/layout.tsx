"use client";
import NavBar from "@/components/NavBar";
import TopBar from "@/components/TopBar";
import SignInForm from "@/components/signin/SignInForm";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/lib/hooks";
import React, { useCallback, useLayoutEffect } from "react";
import { initSocket } from "@/lib/features/chat/chatSlice";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { useReportWebVitals } from "next/web-vitals";
type ChatRouteProps = {
  readonly children: React.ReactNode;
};
export default function ChatRouteLayout({ children }: ChatRouteProps) {
  const [session, setSession] = React.useState<Session | "loading" | null>(
    "loading"
  );
  const dispatch = useAppDispatch();
  const init = useCallback(async () => {
    const session = await getSession();
    setSession(session);
    dispatch(initSocket(session?.user!));
  }, []);
  useLayoutEffect(() => {
    init();
  }, [dispatch]);
  useReportWebVitals((metric) => {
    console.log(metric);
  });
  if (!session) {
    return (
      <Dialog open>
        <DialogContent hideCloseBtn className="!w-96">
          <DialogHeader>
            <DialogTitle>Sign in</DialogTitle>
          </DialogHeader>
          <DialogDescription>Connect to your friends</DialogDescription>
          <hr />
          <SignInForm />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <section className="flex">
      <NavBar />
      <div className=" w-full flex flex-col ">
        <TopBar />
        {children}
      </div>
    </section>
  );
}
