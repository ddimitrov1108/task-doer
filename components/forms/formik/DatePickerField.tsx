"use client";

import { IFormInput } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { format, isValid, parseISO } from "date-fns";
import { ComponentProps } from "react";
import { ErrorMessage, Label } from ".";

type Props = IFormInput<string> & ComponentProps<"input">;

const tryFormatDate = (value: Date) => {
  try {
    if (isValid(value)) {
      return format(value, "dd/MM/yyyy");
    } else {
      format(new Date(), "dd/MM/yyyy");
    }
  } catch (error) {
    return format(new Date(), "dd/MM/yyyy");
  }
};

const DatePickerField = ({
  label,
  subLabel,
  type = "text",
  className,
  field,
  form: { touched, errors },
  fullWidth,
  ...restProps
}: Props) => {
  const formattedDate = format(field.value || new Date(), "dd/MM/yyyy") 

  return (
    <div className={cn("mb-4 min-h-fit", fullWidth ? "w-full" : "w-fit")}>
      <Label className="pb-2" htmlFor={field.name}>
        {label}
      </Label>

      <input
        type="date"
        placeholder={formattedDate}
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
        <ErrorMessage message={errors[field.name]} />
      )}

      {subLabel && (
        <Label className="text-main pb-2" htmlFor={field.name}>
          {subLabel}
        </Label>
      )}
    </div>
  );
};
export default DatePickerField;