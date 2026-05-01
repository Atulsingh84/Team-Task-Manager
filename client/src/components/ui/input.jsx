import { forwardRef } from "react";
import { cn } from "../../lib/utils.js";

export const Input = forwardRef(({ className, ...props }, ref) => {
  return <input className={cn("ui-input", className)} ref={ref} {...props} />;
});

Input.displayName = "Input";
