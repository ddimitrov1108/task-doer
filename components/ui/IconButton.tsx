"use client";

import { cn } from "@/lib/utils";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
}

const IconButton = ({ children, className, ...restProps }: Props) => {
  return (
    <button
      type="button"
      className={cn(
        "text-main hover:text-white outline-none grid items-center justify-center p-1.5 transition-all rounded-full",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default IconButton;
