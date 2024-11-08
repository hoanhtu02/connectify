import { useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";

function useParticipant() {
  const { user, conversations } = useAppSelector((state) => state.chat);
  const { id }: { id: string } = useParams();
  const selectedConversation = conversations.find((c) => c.id === id);
  const friends = selectedConversation?.Participants.filter(
    (u) => u.User.id !== user?.id
  ).map((p) => p.User)!;
  return { user, friends };
}

export default useParticipant;
