import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

function DeclineFriend({ id, children }: { id: string; children?: ReactNode }) {
  return (
    <Button variant="destructive" size="sm">
      {children}
    </Button>
  );
}

export default DeclineFriend;
