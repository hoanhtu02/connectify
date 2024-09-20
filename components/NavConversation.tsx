"use client";
import ConversationItem from "@/components/nav-conversation/ConversationItem";
import List from "@/components/nav-conversation/List";
import { useAppSelector } from "@/lib/hooks";
import { Search } from "@/components/ui/input";
function NavConversation() {
  const { conversations } = useAppSelector((state) => state.chat);
  return (
    <section className=" flex flex-col gap-4">
      <div className="px-4">
        <Search placeholder="Search conversations..." />
      </div>
      <List
        render={() =>
          conversations.length > 0 ? (
            conversations.map((c) => (
              <ConversationItem key={c.id} conversation={c} />
            ))
          ) : (
            <p className="text-center text-sm text-primary px-2 py-4">
              No conversation found
            </p>
          )
        }
      />
    </section>
  );
}

export default NavConversation;
