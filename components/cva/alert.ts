import { cva } from "class-variance-authority";

export type AlertVariants = "info" | "success" | "error" | "warning";

export default cva("div", {
  variants: {
    intent: {
      info: [
        "bg-primary-main/10",
        "border-primary-main/10",
        "border-l-primary-main",
        "text-primary-main",
      ],
      success: [
        "bg-success-light/10",
        "border-success-light/10",
        "border-l-success-main",
        "text-success-main",
      ],
      error: [
        "bg-error-light/10",
        "border-error-light/10",
        "border-l-error-main",
        "text-error-main",
      ],
      warning: [
        "bg-warning-light/10",
        "border-warning-light/10",
        "border-l-warning-main",
        "text-warning-main",
      ],
    },
  },
  defaultVariants: {
    intent: "info",
  },
});
