import React from "react";

type ListProps = {
  readonly render: () => React.ReactNode;
};
function List({ render }: ListProps) {
  return <div className="flex flex-col border-b">{render()}</div>;
}

export default List;
