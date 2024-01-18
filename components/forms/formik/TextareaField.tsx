import { cn } from "@/lib/utils";
import { IFormInput } from "@/lib/interfaces";
import FormLabel from "./FormLabel";
import dynamic from "next/dynamic";

const FormErrorMessage = dynamic(() => import("./FormErrorMessage"));

type Props = IFormInput<string> & React.ComponentProps<"textarea">;

const TextareaField = ({
  label,
  type = "text",
  className,
  field,
  form: { touched, errors },
  fullWidth,
  ...restProps
}: Props) => {
  return (
    <div className={cn("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <FormLabel className="pb-2" htmlFor={field.name} label={label} />

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

      {errors[field.name] && touched[field.name] && (
        <FormErrorMessage message={errors[field.name]} />
      )}
    </div>
  );
};
export default TextareaField;
