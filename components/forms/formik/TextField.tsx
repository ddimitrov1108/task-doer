import cn from "@/lib/cn";
import dynamic from "next/dynamic";
import Label from "./Label";
import { IFormField } from "@/lib/interfaces/form";

const FormErrorMessage = dynamic(() => import("./FormErrorMessage"));

const TextField = ({
  label,
  type = "text",
  containerClassName,
  className,
  field,
  form: { touched, errors },
  fullWidth,
  ...restProps
}: IFormField<string> & React.ComponentProps<"input">) => {
  return (
    <div
      className={cn("mb-4", fullWidth ? "w-full" : "w-fit", containerClassName)}
    >
      <Label className="pb-2" htmlFor={field.name} text={label} />

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

      {errors[field.name] && touched[field.name] ? (
        <FormErrorMessage message={errors[field.name]} />
      ) : null}
    </div>
  );
};
export default TextField;
