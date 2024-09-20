import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "next-auth";
type FriendItemProps = {
  readonly renderButtonAction?: () => JSX.Element;
  readonly user: User;
  readonly position?: "horizontal" | "vertical";
};
const setting = {
  box: {
    horizontal: "flex items-center gap-4",
    vertical: "flex flex-col items-center gap-4",
  },
  container: {
    horizontal: "grid gap-4 p-4",
    vertical: "grid gap-4 py-8 px-2",
  },
  avatar: {
    horizontal: "",
    vertical: "w-20 h-20",
  },
};
function FriendItem({
  renderButtonAction,
  user,
  position = "vertical",
}: FriendItemProps) {
  return (
    <div className={setting.container[position]}>
      <div className={setting.box[position]}>
        <Avatar className={setting.avatar[position]}>
          <AvatarImage src={user?.image!} alt={user?.name!} />
          <AvatarFallback>{user?.name![0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{user?.name!}</p>
        </div>
        {renderButtonAction?.()}
      </div>
    </div>
  );
}

export default FriendItem;
