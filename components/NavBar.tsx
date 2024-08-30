import ListConversation from "@/components/navbar/ListConversation";
import HeaderNav from "@/components/navbar/HeaderNav";
import ConversationItem from "@/components/navbar/ConversationItem";
import ClassifyConversation from "@/components/navbar/ClassifyConversation";
import { useAppSelector } from "@/lib/hooks";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import RequestFriendItem from "./navbar/RequestFriendItem";
import { useState } from "react";
function NavBar() {
  const { conversations } = useAppSelector((state) => state.chat);
  const { friendRequestsReceived } = useAppSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("chats");
  return (
    <section className="border-r">
      <div className="bg-slate-50">
        <HeaderNav />
      </div>
      <Tabs defaultValue="chats" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="justify-start w-full bg-slate-50">
          <TabsTrigger value="chats">Chats</TabsTrigger>
          <TabsTrigger value="request" className="relative">
            Requests
            {friendRequestsReceived.length > 0 && (
              <span className=" bg-red-500 rounded-full w-2 h-2 absolute top-1 right-1"></span>
            )}
          </TabsTrigger>
          <ClassifyConversation />
        </TabsList>
        <TabsContent value="chats" forceMount hidden={activeTab !== "chats"}>
          <ListConversation
            render={() =>
              conversations.length > 0 ? (
                conversations.map((c) => (
                  <ConversationItem key={c.id} conversation={c} />
                ))
              ) : (
                <p className="text-center text-sm text-gray-500">
                  No conversation found
                </p>
              )
            }
          />
        </TabsContent>
        <TabsContent
          value="request"
          forceMount
          hidden={activeTab !== "request"}
        >
          <ListConversation
            render={() =>
              friendRequestsReceived.length > 0 ? (
                friendRequestsReceived.map((u) => (
                  <RequestFriendItem key={u?.id} user={u} />
                ))
              ) : (
                <p className="text-center text-sm text-gray-500">
                  No request found
                </p>
              )
            }
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default NavBar;
