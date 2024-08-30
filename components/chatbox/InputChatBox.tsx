import { Send, TextCursor } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import IconList from "@/components/chatbox/EmojiList";
function InputChatBox() {
  return (
    <section className="border-t p-2 flex gap-2">
      <div className="flex gap-2">
        <ToggleGroup type="multiple">
          <IconList />
          <ToggleGroupItem title="Editor" value="2">
            <TextCursor size={17} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-2 flex-grow">
        {/* <Textarea placeholder="Type a message (/)" /> */}
        <Input placeholder="Type a message (/)" />
        <Button>
          <Send size={17} className="mr-2" />
          Send
        </Button>
      </div>
    </section>
  );
}

export default InputChatBox;
