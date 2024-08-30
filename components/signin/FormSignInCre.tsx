"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import delay from "delay";
const SignInInput = zod.object({
  email: zod
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: zod
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});
function FormSignInCre() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SignInInput) });
  const path = usePathname();
  const currentUrl = path === "/signin" ? "/" : path;
  const callbackUrl = useSearchParams().get("callbackUrl");
  const callbackWithoutOrigin = callbackUrl?.replace(/^https?:\/\/[^\/]+/, "");
  const redirectUrl = callbackWithoutOrigin || currentUrl;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(async ({ email, password }) => {
        try {
          setLoading(true);
          const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          if (response?.error) {
            throw new Error(response.error);
          }
          toast.success("Welcome back!, you are now signed in");
          await delay(2000);
          if (redirectUrl === window.location.pathname) {
            router.refresh();
            return;
          }
          router.push(redirectUrl);
        } catch (error) {
          toast.error("Something went wrong, we couldn't sign you in");
        } finally {
          setLoading(false);
        }
      })}
      className="grid gap-y-4"
    >
      <div className="grid w-full items-center gap-y-6">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
            placeholder="Your own email"
          />
          {errors.email?.message && (
            <small className="text-destructive">
              {errors.email?.message as string}
            </small>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="pass">Password</Label>
          <Input
            id="password"
            {...register("password")}
            placeholder="Your password"
          />
          {errors.password?.message && (
            <small className="text-destructive">
              {errors.password?.message as string}
            </small>
          )}
        </div>
        <Button type="submit" className="flex" disabled={loading}>
          Sign in
        </Button>
      </div>
      <p className="text-muted-foreground text-sm">
        May you want to {""}
        <Link href="/signup" className="hover:underline">
          create an account?
        </Link>
      </p>
    </form>
  );
}

export default FormSignInCre;
