"use client";
import TabFriends from "@/components/TabFriends";
import TabRequestFriends from "@/components/TabRequestFriends";
import { Search } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("list-friend");
  return (
    <section className="flex-grow flex-shrink">
      <Tabs
        defaultValue="list-friend"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className=" w-full">
          <TabsTrigger value="list-friend">List friends</TabsTrigger>
          <TabsTrigger value="list-group">List groups</TabsTrigger>
          <TabsTrigger value="list-request-friend">
            List request friends
          </TabsTrigger>
        </TabsList>
        <TabsContent value="list-friend" className="p-4 my-2">
          <Search placeholder="Search your friend..." />
          <TabFriends />
        </TabsContent>
        <TabsContent value="list-group">Show your list group here.</TabsContent>
        <TabsContent value="list-request-friend">
          <TabRequestFriends />
        </TabsContent>
      </Tabs>
    </section>
  );
}
