import ChatContainer from "@/components/ChatContainer";
import { auth } from "@/auth";
import SignInForm from "@/components/signin/SignInForm";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
async function Page() {
  const session = await auth();

  if (!session) {
    return (
      <Dialog open>
        <DialogContent hideCloseBtn className="!w-96">
          <DialogHeader>
            <DialogTitle>Sign in</DialogTitle>
          </DialogHeader>
          <DialogDescription>Connect to your friends</DialogDescription>
          <hr />
          <SignInForm />
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <div className="min-h-screen flex">
      <ChatContainer />
    </div>
  );
}

export default Page;
