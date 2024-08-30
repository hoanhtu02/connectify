import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Settings, Group, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/lib/hooks";
import AddFriendDialog from "./AddFriendDialog";

function HeaderNav() {
  const { user } = useAppSelector((state) => state.chat);
  return (
    <div className="flex gap-4 justify-between items-center px-2 py-4">
      <div className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src={user?.image!} alt={`@${user?.name!}`} />
          <AvatarFallback>{user?.name?.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className=" font-semibold leading-none text-sm">{user?.name!}</p>
          <Badge variant={"success"} className="text-[0.5rem]">
            Online
          </Badge>
        </div>
      </div>
      <div className="flex gap-2">
        <AddFriendDialog>
          <Button variant="outline" size="sm" className="px-2">
            <UserPlus size={17} />
          </Button>
        </AddFriendDialog>
        <Button variant="outline" size="sm" className="px-2">
          <Group size={17} />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="px-2">
              <Settings size={17} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Friends</DropdownMenuItem>
              <DropdownMenuItem>Request friend</DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default HeaderNav;
