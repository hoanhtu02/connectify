import NavFilterChat from "@/components/NavConversation";
export default function ConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="grid grid-cols-[370px_1fr] flex-grow h-full w-full">
      <NavFilterChat />
      <section className="flex flex-col">
        <div className="flex-grow flex-shrink flex flex-col">{children}</div>
      </section>
    </section>
  );
}
