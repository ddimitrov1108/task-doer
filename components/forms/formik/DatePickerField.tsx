import { IFormField } from "@/lib/interfaces/form";
import cn from "@/lib/cn";
import { format } from "date-fns";
import Label from "./Label";
import dynamic from "next/dynamic";

const FormErrorMessage = dynamic(() => import("./FormErrorMessage"));

const DatePickerField = ({
  label = "",
  type = "date",
  containerClassName,
  className,
  field,
  form: { setFieldValue, touched, errors },
  fullWidth,
  ...restProps
}: IFormField<string> & React.ComponentProps<"input">) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(field.name, format(new Date(e.target.value), "yyyy-MM-dd"));
  };

  return (
    <div
      className={cn("mb-4", fullWidth ? "w-full" : "w-fit", containerClassName)}
    >
      <Label className="pb-2" htmlFor={field.name} text={label} />

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

      {errors[field.name] && touched[field.name] ? (
        <FormErrorMessage message={errors[field.name]} />
      ) : null}
    </div>
  );
};
export default DatePickerField;
