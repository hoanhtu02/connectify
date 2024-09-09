import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { Sticker } from "lucide-react";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
function GifList() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToggleGroupItem title="Sticker" value="3">
          <Sticker size={17} />
        </ToggleGroupItem>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Picker data={data} onSelect={console.log} />
      </PopoverContent>
    </Popover>
  );
}

export default GifList;
