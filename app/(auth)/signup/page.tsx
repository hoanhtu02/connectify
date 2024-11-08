import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import FormSignUpCre from "@/components/signup/FormSignUpCre";
function Page() {
  return (
    <Card className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] min-w-96">
      <FormSignUpCre />
    </Card>
  );
}

export default Page;
