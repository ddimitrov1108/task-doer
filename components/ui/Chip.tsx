"use client";

import { cn } from "@/lib/utils";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  prepEndIcon?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
  title?: string;
}
const Chip = ({ children, prepEndIcon, className, ...restProps }: Props) => {
  return (
    <button
      type="button"
      className={cn(
        "text-sm text-light transition-all flex items-center gap-1 min-w-fit whitespace-no-wrap py-0.5 px-1.5 border border-black-light/40 rounded-full",
        className
      )}
      {...restProps}
    >
      {prepEndIcon && (
        <span className="text-primary-main font-medium">{prepEndIcon}</span>
      )}
      {children}
    </button>
  );
};
export default Chip;
