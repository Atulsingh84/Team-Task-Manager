import { forwardRef } from "react";
import { cn } from "../../lib/utils.js";

export const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <select className={cn("ui-select", className)} ref={ref} {...props}>
      {children}
    </select>
  );
});

Select.displayName = "Select";
