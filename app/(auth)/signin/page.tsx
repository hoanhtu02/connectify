import SignInForm from "@/components/signin/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Page() {
  return (
    <Card className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-96">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Connect to your friends</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <SignInForm />
      </CardContent>
    </Card>
  );
}

export default Page;
