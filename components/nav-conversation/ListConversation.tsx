import React from "react";

type ListConversationProps = {
  readonly render: () => React.ReactNode;
};
function ListConversation({ render }: ListConversationProps) {
  return <div className="flex flex-col">{render()}</div>;
}

export default ListConversation;
