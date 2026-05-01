import { forwardRef } from "react";
import { cn } from "../../lib/utils.js";

export const Textarea = forwardRef(({ className, ...props }, ref) => {
  return <textarea className={cn("ui-textarea", className)} ref={ref} {...props} />;
});

Textarea.displayName = "Textarea";
