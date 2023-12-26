import { cva } from "class-variance-authority";

export type AlertVariants = "info" | "success" | "error" | "warning";
export type AlertIconsVariants = "info" | "success" | "error" | "warning";

export const alert = cva("div", {
  variants: {
    intent: {
      info: [
        "bg-primary-main/10",
        "border-primary-main/40",
        "border-l-primary-main",
        "text-primary-main",
      ],
      success: [
        "bg-success-light/10",
        "border-success-light/40",
        "border-l-success-main",
        "text-success-main",
      ],
      error: [
        "bg-error-light/10",
        "border-error-light/20",
        "border-l-error-main",
        "text-error-main",
      ],
      warning: [
        "bg-warning-light/10",
        "border-warning-light/40",
        "border-l-warning-main",
        "text-warning-main",
      ],
    },
  },
  defaultVariants: {
    intent: "info",
  },
});
