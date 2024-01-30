import cn from "@/lib/cn";
import { FormikErrors } from "formik";

interface Props extends React.ComponentProps<"div"> {
  message?:
    | string
    | FormikErrors<any>
    | string[]
    | FormikErrors<any>[]
    | undefined;
}

const FormErrorMessage = ({ message, className }: Props) => {
  return (
    <div
      className={cn(
        "py-1 text-xs font-semibold transition-all text-error-main",
        className
      )}
    >
      <>{message as string}</>
    </div>
  );
};
export default FormErrorMessage;
