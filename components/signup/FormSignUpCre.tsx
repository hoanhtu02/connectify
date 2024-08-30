"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";
import { startTransition } from "react";
export const FormInput = z
  .object({
    name: z.string().min(3, { message: "Name is too short" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password is too short" }),
    repeatPassword: z.string().min(6, { message: "Password is too short" }),
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["repeatPassword"],
      });
    }
  });
function FormSignUpCre() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormInput),
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const response = await fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const message = await response.text();
          if (!response.ok) {
            throw new Error(message);
          }

          if (!response)
            throw new Error("Failed to create account, something went wrong");
          toast.success("Account created successfully, wait for redirect");
          setTimeout(() => startTransition(() => redirect("/signin")), 2000);
        } catch (error: any) {
          toast.error(error.message);
        }
      })}
      className="flex flex-col gap-4"
    >
      <div className="grid w-full items-center gap-y-6">
        <div className="flex flex-col">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")}
            className="mt-2"
            placeholder="Your name"
          />
          {errors.name && (
            <small className="text-destructive leading-none mt-1">
              {errors.name.message?.toString()}
            </small>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
            className="mt-2"
            placeholder="Your own email"
          />
          {errors.email && (
            <small className="text-destructive leading-none mt-1">
              {errors.email.message?.toString()}
            </small>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="pass">Password</Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            className="mt-2"
            placeholder="Your password"
          />
          {errors.password && (
            <small className="text-destructive leading-none mt-1">
              {errors.password.message?.toString()}
            </small>
          )}
        </div>
        <div className="flex flex-col">
          <Label htmlFor="pass">Repeat password</Label>
          <Input
            id="repeatPassword"
            {...register("repeatPassword")}
            type="password"
            className="mt-2"
            placeholder="Repeat your password"
          />
          {errors.repeatPassword && (
            <small className="text-destructive leading-none mt-1">
              {errors.repeatPassword.message?.toString()}
            </small>
          )}
        </div>
        <Button type="submit" className="flex">
          Sign up
        </Button>
      </div>
      <hr />
      <p className="text-muted-foreground">
        Already have an account?{" "}
        <Link href="/signin" className="hover:underline">
          Sign in now
        </Link>
      </p>
    </form>
  );
}

export default FormSignUpCre;
