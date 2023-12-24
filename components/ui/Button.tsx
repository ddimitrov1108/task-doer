"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ButtonSizes, ButtonType, ButtonVariants, button } from "../cva/button";
import { Spinner } from ".";

interface Props {
  type?: ButtonType;
  children?: ReactNode;
  variant?: ButtonVariants;
  size?: ButtonSizes;
  fullWidth?: boolean;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
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
            variant != null && ["outlined", "text", "basic"].includes(variant)
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
