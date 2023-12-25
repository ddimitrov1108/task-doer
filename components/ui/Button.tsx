"use client";

import { cn } from "@/lib/utils";
import { MouseEventHandler, ReactNode } from "react";
import { ButtonSizes, ButtonType, ButtonVariants, button } from "../cva/button";
import { Spinner } from ".";

interface Props {
  children?: ReactNode;
  type?: ButtonType;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  fullWidth?: boolean;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

const Button = ({
  type = "button",
  variant = "primary",
  size = "md",
  children,
  fullWidth,
  className,
  loading,
  disabled,
  ...restProps
}: Props) => {
  return (
    <button
      className={cn(
        "font-medium border transition-all duration-300 rounded-lg",
        className,
        fullWidth ? "w-full" : "w-fit",
        button({ intent: variant, size: size })
      )}
      type={type}
      disabled={disabled}
      {...restProps}
    >
      {loading ? (
        <Spinner
          className={cn(
            "w-fit h-fit mx-auto",
            ["outlined", "text", "basic"].includes(variant)
              ? "text-primary-main"
              : "text-white"
          )}
        />
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
