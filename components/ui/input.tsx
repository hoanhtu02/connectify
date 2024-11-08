import * as React from "react";

import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon, Search as SearchIcon } from "lucide-react";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          "flex h-10 items-center rounded-md border border-input pl-3 text-sm bg-primary-foreground",
          className
        )}
      >
        <SearchIcon size={17} />
        <input
          {...props}
          type="search"
          ref={ref}
          className="bg-primary-foreground w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
      </label>
    );
  }
);

Search.displayName = "Search";

export { Input, Search };
