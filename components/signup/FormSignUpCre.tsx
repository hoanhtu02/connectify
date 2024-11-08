"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import StepName from "@/components/signup/StepName";
import StepEmail from "@/components/signup/StepEmail";
import StepPassword from "./StepPassword";
import { useLayoutEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    trigger,
  } = useForm({
    resolver: zodResolver(FormInput),
  });
  const [step, setStep] = useState(1);
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          const response = await axios.post("/api/signup", data);
          if (response.status === 400)
            throw new Error("Failed to create account, something went wrong");
          toast.success("Account created successfully, wait for redirect");
          setTimeout(() => {
            window.location.href = "/signin";
          }, 2000);
        } catch (error: any) {
          toast.error(error?.response?.data);
        }
      })}
      className="flex flex-col gap-2"
    >
      <div className="grid w-full items-center">
        <StepName
          {...{
            errors,
            show: step === 1,
            register,
            trigger,
            setStep,
          }}
        />
        <StepEmail
          {...{
            errors,
            show: step === 2,
            register,
            setStep,
            trigger,
          }}
        />
        <StepPassword
          {...{
            errors,
            show: step === 3,
            register,
            setStep,
            trigger,
          }}
        />
      </div>
      <hr />
      <p className="text-muted-foreground text-sm px-6 pt-2 pb-4">
        Already have an account?{" "}
        <Link href="/signin" className="hover:underline">
          Sign in now
        </Link>
      </p>
    </form>
  );
}

export default FormSignUpCre;
