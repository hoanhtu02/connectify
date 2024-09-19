import ConversationItem from "@/components/nav-conversation/ConversationItem";
import ListConversation from "@/components/nav-conversation/ListConversation";
import { useAppSelector } from "@/lib/hooks";

function TabConversations() {
  const { conversations } = useAppSelector((state) => state.chat);
  return (
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
  );
}

export default TabConversations;
