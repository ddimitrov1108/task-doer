import { cn } from "@/lib/utils";
import { FormikErrors } from "formik";

interface Props {
  message?:
    | string
    | FormikErrors<any>
    | string[]
    | FormikErrors<any>[]
    | undefined;
  className?: string;
}

const ErrorMessage = ({ message, className }: Props) => {
  const errorMessage = Array.isArray(message) ? message[0] : message;

  return (
    <div
      className={cn(
        "py-1 text-xs font-semibold transition-all text-error-main",
        className
      )}
    >
      <>{errorMessage}</>
    </div>
  );
};
export default ErrorMessage;
