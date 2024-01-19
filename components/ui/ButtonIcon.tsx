import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

interface Props extends React.ComponentProps<"button"> {
  loading?: boolean;
}

const ButtonIcon = ({ loading, children, className, ...restProps }: Props) => {
  return (
    <button
      className={cn(
        "outline-none grid items-center justify-center p-1.5 transition-all rounded-full",
        className
      )}
      {...restProps}
    >
      {loading ? (
        <Spinner className="w-fit h-fit mx-auto text-light" />
      ) : (
        children
      )}
    </button>
  );
};
export default ButtonIcon;
