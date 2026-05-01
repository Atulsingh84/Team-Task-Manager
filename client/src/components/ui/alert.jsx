import { cn } from "../../lib/utils.js";

export function Alert({ className, variant = "default", ...props }) {
  return <div className={cn("ui-alert", `ui-alert-${variant}`, className)} role="alert" {...props} />;
}
