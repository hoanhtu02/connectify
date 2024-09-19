import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddFriendDialog from "@/components/nav-conversation/AddFriendDialog";

function ClassifyConversation() {
  return (
    <div className="flex justify-between items-center ml-auto">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className=" text-sm h-7">
            Classify
            <ChevronDown size={17} className="ml-1" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>content</PopoverContent>
      </Popover>
    </div>
  );
}

export default ClassifyConversation;
