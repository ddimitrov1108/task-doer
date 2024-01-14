"use client";

import { cn } from "@/lib/utils";
import { IFormInput } from "@/lib/interfaces";
import { Label } from ".";
import dynamic from "next/dynamic";

const ErrorMessage = dynamic(() => import("./ErrorMessage"));

type Props = IFormInput<string> & React.ComponentProps<"input">;

const TextField = ({
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
      <Label className="pb-2" htmlFor={field.name} label={label} />

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
        <ErrorMessage message={errors[field.name]} />
      )}
    </div>
  );
};
export default TextField;
