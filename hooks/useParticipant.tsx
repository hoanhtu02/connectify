import { useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";

function useParticipant() {
  const { user, conversations } = useAppSelector((state) => state.chat);
  const { id }: { id: string } = useParams();
  const selectedConversation = conversations.find((c) => c.id === id);
  const friend = selectedConversation?.Participants.find(
    (u) => u.User.id !== user?.id
  )?.User;
  return { user, friend };
}

export default useParticipant;
