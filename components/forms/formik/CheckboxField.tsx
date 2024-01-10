"use client";

import { cn } from "@/lib/utils";
import { Switch } from "@headlessui/react";
import { Label } from ".";
import { IFormInput } from "@/lib/interfaces";

type Props = IFormInput<boolean>;

const CheckboxField = ({
  label = "",
  fullWidth = false,
  field,
  disabled,
  form: { setFieldValue },
}: Props) => {
  return (
    <Switch.Group
      as="div"
      className={cn(
        "flex items-center gap-2 mb-4",
        fullWidth ? "w-full" : "w-fit"
      )}
    >
      <Label className="pb-0" htmlFor={field.name}>
        {label}
      </Label>

      <Switch
        disabled={disabled}
        checked={field.value}
        onChange={() => setFieldValue(field.name, !field.value)}
        className={cn(
          "border border-black-light/20 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none",
          field.value ? "bg-primary-main" : "bg-black-dark"
        )}
      >
        <span className="sr-only">Enable</span>
        <span
          className={cn(
            "inline-block w-4 h-4 transform rounded-full transition-transform",
            field.value ? "bg-white translate-x-6" : "bg-light translate-x-1"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};
export default CheckboxField;
