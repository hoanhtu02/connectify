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
} from "../ui/card";
import { Dispatch, SetStateAction, useLayoutEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

interface StepEmailProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  show: boolean;
  setStep: Dispatch<SetStateAction<number>>;
  trigger: UseFormTrigger<FieldValues>;
}

function StepEmail({
  register,
  errors,
  show,
  setStep,
  trigger,
}: Readonly<StepEmailProps>) {
  const [value, setValue] = useState("");
  useLayoutEffect(() => {
    trigger("email");
  }, [value]);
  return (
    <div
      className={` ${
        show ? "animate-slide-in block" : "animate-slide-out hidden"
      } `}
    >
      <CardHeader>
        <CardTitle>We are almost there</CardTitle>
        <CardDescription>What's your email? (required) </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email")}
          className="mt-2"
          onInput={async (e) => {
            setValue(e.currentTarget.value);
          }}
          placeholder="Your own email"
        />
        {errors.email && (
          <small className="text-destructive leading-none mt-1">
            {errors.email.message?.toString()}
          </small>
        )}

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
            type="button"
            className="flex flex-shrink flex-grow"
            size="sm"
            disabled={!!errors.email}
            onClick={() => setStep((step) => step + 1)}
          >
            Next step
          </Button>
        </div>
      </CardContent>
    </div>
  );
}

export default StepEmail;
