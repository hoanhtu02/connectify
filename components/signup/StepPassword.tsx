import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  UseFormTrigger,
} from "react-hook-form";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";

interface StepPasswordProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  show: boolean;
  setStep: Dispatch<SetStateAction<number>>;
  trigger: UseFormTrigger<FieldValues>;
}

function StepPassword({
  register,
  errors,
  show,
  setStep,
  trigger,
}: Readonly<StepPasswordProps>) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  useLayoutEffect(() => {
    trigger("password");
    trigger("repeatPassword");
  }, [password, repeatPassword]);
  return (
    <div
      className={`${
        show ? "animate-slide-in block" : "animate-slide-out hidden"
      }`}
    >
      <CardHeader>
        <CardTitle>Protect your account</CardTitle>
        <CardDescription>Set a password for your account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col">
          <Label htmlFor="pass">Password</Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            onInput={async (e) => {
              setPassword(e.currentTarget.value);
            }}
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
            onInput={async (e) => {
              setRepeatPassword(e.currentTarget.value);
            }}
            className="mt-2"
            placeholder="Repeat your password"
          />
          {errors.repeatPassword && (
            <small className="text-destructive leading-none mt-1">
              {errors.repeatPassword.message?.toString()}
            </small>
          )}
        </div>
        <div className="flex gap-2 items-center mt-4">
          <Button
            type="button"
            size="icon_sm"
            onClick={() => {
              setStep((prev) => prev - 1);
            }}
            className="flex"
          >
            <ChevronLeft size={17} />
          </Button>
          <Button
            type="submit"
            className="flex flex-grow"
            size="sm"
            disabled={!!errors.password || !!errors.repeatPassword}
            onClick={() => setStep((step) => step + 1)}
          >
            Sign up
          </Button>
        </div>
      </CardContent>
    </div>
  );
}

export default StepPassword;
