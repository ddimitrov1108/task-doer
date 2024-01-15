import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import Spinner from "./Spinner";

interface Props extends ComponentProps<"button"> {
  loading?: boolean;
}

const ButtonIcon = ({ children, loading, className, ...restProps }: Props) => {
  return (
    <button
      className={cn(
        "text-main hover:text-white outline-none grid items-center justify-center p-1.5 transition-all rounded-full",
        className
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
