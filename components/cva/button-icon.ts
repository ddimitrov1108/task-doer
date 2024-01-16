import { cva } from "class-variance-authority";

export type ButtonIconVariants =
  | "primary"
  | "outlined"
  | "info"
  | "success"
  | "warning"
  | "error";

export const button_icon = cva("button", {
  variants: {
    intent: {
      primary: ["bg-black-main", "text-main"],
      outlined: ["bg-black-dark", "border-black-light/20", "text-main"],
      info: ["bg-primary-main/10", "text-primary-main"],
      success: ["bg-success-light/10", "text-success-main"],
      warning: ["bg-warning-light/10", "text-warning-main"],
      error: ["bg-error-light/10", "text-error-main"],
    },
    size: {
      sm: ["p-1"],
      md: ["p-2"],
      lg: ["p-3"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});
