import { IFormInput } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { format, isValid } from "date-fns";
import FormLabel from "./FormLabel";
import dynamic from "next/dynamic";

const FormErrorMessage = dynamic(() => import("./FormErrorMessage"));

type Props = IFormInput<string> & React.ComponentProps<"input">;

const DatePickerField = ({
  label = "",
  type = "date",
  className,
  field,
  form: { setFieldValue, touched, errors },
  fullWidth,
  ...restProps
}: Props) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, format(new Date(e.target.value), "yyyy-MM-dd"));
  };

  return (
    <div className={cn("mb-4 min-h-fit", fullWidth ? "w-full" : "w-fit")}>
      <FormLabel className="pb-2" htmlFor={field.name} label={label} />

      <input
        type="date"
        placeholder={format(new Date(field.value) || new Date(), "dd/MM/yyyy")}
        className={cn(
          "bg-black-dark border outline-none px-4 py-2.5 rounded-lg w-full",
          className,
          errors[field.name] && touched[field.name]
            ? "border-error-main"
            : "border-black-light/20 focus:border-primary-main"
        )}
        {...field}
        {...restProps}
        onChange={onChangeHandler}
      />

      {errors[field.name] && touched[field.name] && (
        <FormErrorMessage message={errors[field.name]} />
      )}
    </div>
  );
};
export default DatePickerField;
