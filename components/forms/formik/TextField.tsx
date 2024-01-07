"use client";

import { Label, ErrorMessage } from ".";
import { cn } from "@/lib/utils";
import { IFormInput } from "@/lib/interfaces";

const TextField = ({
  label,
  subLabel,
  type = "text",
  className,
  field,
  form: { touched, errors },
  fullWidth,
  disabled,
  ...restProps
}: IFormInput<string>) => {
  return (
    <div className={cn("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label className="pb-2" htmlFor={field.name}>
        {label}
      </Label>

      <input
        type={type}
        disabled={disabled}
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
export default TextField;
