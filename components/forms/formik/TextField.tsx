import { IFormInput } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import FormLabel from "./FormLabel";

const FormErrorMessage = dynamic(() => import("./FormErrorMessage"));

type Props = IFormInput<string> & React.ComponentProps<"input">;

const TextField = ({
  label,
  type = "text",
  containerClassName,
  className,
  field,
  form: { touched, errors },
  fullWidth,
  ...restProps
}: Props) => {
  return (
    <div
      className={cn("mb-4", fullWidth ? "w-full" : "w-fit", containerClassName)}
    >
      <FormLabel className="pb-2" htmlFor={field.name} label={label} />

      <input
        type={type}
        className={cn(
          "bg-black-dark border outline-none px-4 py-2.5 rounded-lg w-full",
          className,
          errors[field.name] && touched[field.name]
            ? "border-error-main"
            : "border-black-light/20 focus:border-primary-main"
        )}
        {...field}
        {...restProps}
      />

      {errors[field.name] && touched[field.name] && (
        <FormErrorMessage message={errors[field.name]} />
      )}
    </div>
  );
};
export default TextField;
