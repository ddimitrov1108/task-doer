import { cn } from "@/lib/utils";
import { FormikErrors } from "formik";

type Props = {
  message?:
    | string
    | FormikErrors<any>
    | string[]
    | FormikErrors<any>[]
    | undefined;
  className?: string;
};

const ErrorMessage = ({ message, className }: Props) => {
  return (
    <div
      className={cn(
        "py-1 text-xs font-semibold transition-all text-error-main",
        className
      )}
    >
      <>{Array.isArray(message) ? message[0] : message}</>
    </div>
  );
};
export default ErrorMessage;
