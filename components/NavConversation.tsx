"use client";
import HeaderNav from "@/components/nav-conversation/HeaderNav";
import ClassifyConversation from "@/components/nav-conversation/ClassifyConversation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import TabConversations from "@/components/TabConversations";
import TabRequestFriends from "@/components/TabRequestFriends";
import TabFriends from "@/components/TabFriends";
function NavConversation() {
  const [activeTab, setActiveTab] = useState("chats");
  return (
    <section className="border-r">
      <div className="">
        <HeaderNav />
      </div>
      <Tabs defaultValue="chats" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="justify-start w-full">
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="request">Requests</TabsTrigger>
          <ClassifyConversation />
        </TabsList>
        <TabsContent value="chats" forceMount hidden={activeTab !== "chats"}>
          <TabConversations />
        </TabsContent>
        <TabsContent
          value="friends"
          forceMount
          hidden={activeTab !== "friends"}
        >
          <TabFriends />
        </TabsContent>
        <TabsContent
          value="request"
          forceMount
          hidden={activeTab !== "request"}
        >
          <TabRequestFriends />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default NavConversation;
