import { cva } from "class-variance-authority";

export type ButtonSizes = "sm" | "md" | "lg";
export type ButtonLoadingAnimationColor = "text-primary-main" | "text-white";

export type ButtonVariants =
  | "primary"
  | "secondary"
  | "outlined"
  | "error"
  | "text";

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
        "bg-primary-main/10",
        "border-transparent",
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
      text: ["text-primary-main", "bg-inherit", "border-transparent", "hover:bg-primary-main/10"],
    },
    size: {
      sm: ["py-1", "px-2"],
      md: ["py-2.5", "px-4"],
      lg: ["py-3.5", "px-4"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});
