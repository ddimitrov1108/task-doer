import { cva } from "class-variance-authority";

export type ButtonType = "button" | "submit" | "reset" | undefined;

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "outlined"
  | "error"
  | "text"
  | "basic"
  | null
  | undefined;

export type ButtonSizes = "sm" | "md" | "lg" | null | undefined;

export const button = cva("button", {
  variants: {
    intent: {
      primary: [
        "text-white",
        "bg-primary-main",
        "border-primary-main",
        "hover:bg-primary-dark",
        "hover:border-primary-dark",
      ],
      secondary: [
        "bg-primary-main/20",
        "border-primary-main/20",
        "text-primary-main",
        "hover:bg-primary-main hover:text-white",
      ],
      outlined: [
        "border-primary-main",
        "bg-transparent",
        "text-gray-300",
        "hover:bg-primary-main",
        "hover:text-white",
      ],
      error: [
        "text-white",
        "bg-error-main",
        "border-error-main",
        "hover:bg-error-dark",
        "hover:border-error-dark",
      ],
      text: ["text-primary-main", "bg-inherit", "border-gray-600/40"],
      basic: [
        "bg-white",
        "border border-gray-200 hover:border-gray-300-light/60",
        "hover:border-gray-200 hover:border-gray-300-light",
      ],
    },
    size: {
      sm: ["py-1.5", "px-2"],
      md: ["py-2.5", "px-4"],
      lg: ["py-3.5", "px-6"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});