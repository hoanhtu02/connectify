"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import ListFriend from "@/components/friend-search/ListFriend";
import debounce from "lodash.debounce";
import { useAppDispatch } from "@/lib/hooks";
import { searchFriend } from "@/lib/features/user/userSlice";

function AddFriendDialog({ children }: { readonly children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogDescription>
            You can add a friend by entering their username, email.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              onInput={debounce((e) => {
                const value = e.target.value ?? "";
                dispatch(searchFriend(value));
              }, 400)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <ListFriend />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddFriendDialog;
