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

interface StepNameProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  show: boolean;
  setStep: Dispatch<SetStateAction<number>>;
  trigger: UseFormTrigger<FieldValues>;
}

function StepName({
  register,
  errors,
  show,
  setStep,
  trigger,
}: Readonly<StepNameProps>) {
  const [value, setValue] = useState("");
  useLayoutEffect(() => {
    trigger("name");
  }, [value]);
  return (
    <div
      className={` ${
        show ? "animate-slide-in block" : "animate-slide-out hidden"
      } `}
    >
      <CardHeader>
        <CardTitle>Hi there</CardTitle>
        <CardDescription>Let's start with your name</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name")}
          className="mt-2"
          autoComplete="off"
          onInput={async (e) => {
            setValue(e.currentTarget.value);
          }}
          placeholder="Your name"
        />
        {errors.name && (
          <small className="text-destructive leading-none mt-1">
            {errors.name.message?.toString()}
          </small>
        )}
        <Button
          type="button"
          className="flex mt-4"
          size="sm"
          disabled={!!errors.name}
          onClick={() => setStep((step) => step + 1)}
        >
          Next step
        </Button>
      </CardContent>
    </div>
  );
}

export default StepName;
