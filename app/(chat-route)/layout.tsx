import NavBar from "@/components/NavBar";
import ChatRouteContainer from "@/components/ChatRouteContainer";
import TopBar from "@/components/TopBar";
import { auth } from "@/auth";
import SignInForm from "@/components/signin/SignInForm";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
type ChatRouteProps = {
  readonly children: React.ReactNode;
};
export default async function ChatRouteLayout({ children }: ChatRouteProps) {
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
    <section className="flex">
      <NavBar />
      <div className=" w-full flex flex-col ">
        <TopBar />
        <ChatRouteContainer>{children}</ChatRouteContainer>
      </div>
    </section>
  );
}
