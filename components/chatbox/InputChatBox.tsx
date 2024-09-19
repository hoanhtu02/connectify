"use client";
import { PencilLine } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import IconList from "@/components/chatbox/EmojiList";
import QuillEditor from "@/components/QuillEditor";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleEditor } from "@/lib/features/setting/settingSlice";
import GifList from "@/components/chatbox/GifList";

function InputChatBox() {
  const { isUseEditor } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();
  return (
    <section className="border-t flex flex-col">
      <div className="flex border-b">
        <ToggleGroup type="multiple" size="sm" value={isUseEditor ? ["2"] : []}>
          <IconList />
          <GifList />
          <ToggleGroupItem
            title="Editor"
            value="2"
            onClick={() => dispatch(toggleEditor(!isUseEditor))}
          >
            <PencilLine size={17} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex-grow relative  transition-all">
        <QuillEditor />
      </div>
    </section>
  );
}

export default InputChatBox;
