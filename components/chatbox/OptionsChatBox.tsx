import { Info, Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

function OptionsChatBox() {
  return (
    <div className="flex gap-4">
      <Button size="icon" variant="ghost" title="Search messages">
        <Star size={17} />
      </Button>
      <Button size="icon" variant="ghost" title="Search messages">
        <Search size={17} />
      </Button>
      <Button size="icon" variant="ghost" title="Information">
        <Info size={17} />
      </Button>
    </div>
  );
}

export default OptionsChatBox;
