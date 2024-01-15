import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import {
  ButtonLoadingAnimationColor,
  ButtonSizes,
  ButtonVariants,
  button,
} from "../cva/button";
import Spinner from "./Spinner";

interface Props extends ComponentProps<"button"> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className,
  ...restProps
}: Props) => {
  const selectedVariant: ButtonLoadingAnimationColor = [
    "outlined",
    "text",
    "basic",
  ].includes(variant)
    ? "text-primary-main"
    : "text-white";

  return (
    <button
      className={cn(
        "font-medium border transition-all duration-300 rounded-lg",
        className,
        fullWidth ? "w-full" : "w-fit",
        button({ intent: variant, size: size })
      )}
      {...restProps}
    >
      {loading ? (
        <Spinner className={cn("w-fit h-fit mx-auto", selectedVariant)} />
      ) : (
        children
      )}
    </button>
  );
};
export default Button;
