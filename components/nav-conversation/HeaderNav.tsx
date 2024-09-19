import { Group, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddFriendDialog from "@/components/nav-conversation/AddFriendDialog";

function HeaderNav() {
  return (
    <div className="flex gap-4 justify-between items-center p-2">
      <div className="flex gap-2">
        <AddFriendDialog>
          <Button variant="outline" size="sm" className="px-2">
            <UserPlus size={17} />
          </Button>
        </AddFriendDialog>
        <Button variant="outline" size="sm" className="px-2">
          <Group size={17} />
        </Button>
      </div>
    </div>
  );
}

export default HeaderNav;
