import { ReactNode } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "./ui/scroll-area";

function PopoverNotification({ children }: { children: ReactNode }) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="min-h-60 flex flex-col gap-2">
        <h4 className="text-muted-foreground leading-none text-sm">
          Notifications
        </h4>
        <hr />
        <ScrollArea>
          
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverNotification;
