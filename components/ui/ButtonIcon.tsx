import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { ButtonIconVariants, button_icon } from "../cva/button-icon";
import Spinner from "./Spinner";

interface Props extends ComponentProps<"button"> {
  variant?: ButtonIconVariants;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const ButtonIcon = ({
  variant = "primary",
  size = "md",
  loading,
  children,
  className,
  ...restProps
}: Props) => {
  return (
    <button
      className={cn(
        "outline-none grid items-center justify-center p-1.5 transition-all rounded-full",
        className,
        button_icon({ intent: variant, size: size })
      )}
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
export default ButtonIcon;
