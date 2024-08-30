"use client";
import { Separator } from "@/components/ui/separator";
import FormSignInCre from "@/components/signin/FormSignInCre";
import { providerMap } from "@/auth";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname } from "next/navigation";
import { signIn } from "next-auth/react";

function SignInForm() {
  const path = usePathname();
  const currentUrl = path === "/signin" ? "/" : path;
  const callbackUrl = useSearchParams().get("callbackUrl") ?? currentUrl;

  return (
    <>
      <FormSignInCre />
      <Separator />
      <div className="flex flex-col gap-2">
        {Object.values(providerMap).map((provider) => (
          <Button
            key={provider.name}
            onClick={() => signIn(provider.id, { callbackUrl })}
            className="flex-grow"
          >
            Sign in with {provider.name}
          </Button>
        ))}
      </div>
    </>
  );
}

export default SignInForm;
