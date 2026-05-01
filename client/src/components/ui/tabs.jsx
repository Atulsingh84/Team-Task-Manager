import { cn } from "../../lib/utils.js";

export function Tabs({ className, ...props }) {
  return <div className={cn("ui-tabs", className)} {...props} />;
}

export function TabsTrigger({ active, className, ...props }) {
  return <button className={cn("ui-tabs-trigger", active && "is-active", className)} type="button" {...props} />;
}
