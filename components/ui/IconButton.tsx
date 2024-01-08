"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Spinner } from ".";

interface Props extends ComponentProps<"button"> {
  loading?: boolean;
}

const IconButton = ({
  type = "button",
  children,
  loading,
  className,
  ...restProps
}: Props) => {
  return (
    <button
      className={cn(
        "text-main hover:text-white outline-none grid items-center justify-center p-1.5 transition-all rounded-full",
        className
      )}
      type={type}
      {...restProps}
    >
      {loading ? (
        <Spinner className="w-fit h-fit mx-auto text-white" />
      ) : (
        children
      )}
    </button>
  );
};
export default IconButton;
