"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import { SmileIcon } from "lucide-react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
// set	native	The emoji set: native, apple, facebook, google, twitter
const IconList = memo(function () {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ToggleGroupItem title="Emoji" value="1">
          <SmileIcon size={17} />
        </ToggleGroupItem>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Picker data={data} onSelect={console.log} />
      </PopoverContent>
    </Popover>
  );
});

export default IconList;
