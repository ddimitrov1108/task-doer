import cn from "@/lib/cn";
import button, { ButtonVariants } from "../cva/button";
import Spinner from "./Spinner";

interface Props extends React.ComponentProps<"button"> {
  variant?: ButtonVariants;
  size?: "sm" | "md" | "lg";
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
  return (
    <button
      className={cn(
        "font-medium border transition-all duration-300 rounded-lg flex justify-center",
        className,
        fullWidth ? "w-full" : "w-fit",
        button({ intent: variant, size: size })
      )}
      {...restProps}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};
export default Button;
