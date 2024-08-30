import { Info, Search } from "lucide-react";
import { Button } from "../ui/button";

function OptionsChatBox() {
  return (
    <div className="flex gap-4">
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
