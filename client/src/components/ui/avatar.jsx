import { cn } from "../../lib/utils.js";

export function Avatar({ name, className }) {
  const initial = name?.slice(0, 1).toUpperCase() || "?";
  return <div className={cn("ui-avatar", className)}>{initial}</div>;
}
