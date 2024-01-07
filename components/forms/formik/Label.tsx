import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

const Label = ({ children, htmlFor, className }: Props) => {
  return (
    <div className={cn("font-medium text-sm text-light min-w-fit", className)}>
      <label htmlFor={htmlFor}>{children}</label>
    </div>
  );
};
export default Label;
