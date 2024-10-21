"use client";
import { PencilLine } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import IconList from "@/components/chatbox/EmojiList";
import QuillEditor from "@/components/QuillEditor";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { toggleEditor } from "@/lib/features/setting/settingSlice";
import MultiImageUploader from "@/components/chatbox/FileUpload";
import FileUploadProvider from "@/context/FileUploadProvider";

function InputChatBox() {
  const { isUseEditor } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();
  return (
    <section className="border-t flex flex-col p-2">
      <FileUploadProvider>
        <div className="flex">
          <ToggleGroup
            type="multiple"
            size="sm"
            value={isUseEditor ? ["2"] : []}
          >
            <IconList />
            <ToggleGroupItem
              title="Editor"
              value="2"
              onClick={() => dispatch(toggleEditor(!isUseEditor))}
            >
              <PencilLine size={17} />
            </ToggleGroupItem>
          </ToggleGroup>
          <MultiImageUploader />
        </div>
        <div className="flex-grow relative  transition-all">
          <QuillEditor />
        </div>
      </FileUploadProvider>
    </section>
  );
}

export default InputChatBox;
