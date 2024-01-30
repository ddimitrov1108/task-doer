import cn from "@/lib/cn";
import { IFormInput } from "@/lib/interfaces";
import Label from "./Label";
import dynamic from "next/dynamic";

const FormErrorMessage = dynamic(() => import("./FormErrorMessage"));

type Props = IFormInput<string> & React.ComponentProps<"textarea">;

const TextareaField = ({
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
      <Label className="pb-2" htmlFor={field.name} label={label} />

      <textarea
        autoComplete="on"
        className={cn(
          "bg-black-dark border outline-none px-4 py-2.5 rounded-lg w-full max-h-[300px]",
          className,
          errors[field.name] && touched[field.name]
            ? "border-error-main"
            : "border-black-light/20 focus:border-primary-main"
        )}
        {...field}
        {...restProps}
        rows={3}
      ></textarea>

      {errors[field.name] && touched[field.name] ? (
        <FormErrorMessage message={errors[field.name]} />
      ) : null}
    </div>
  );
};
export default TextareaField;
