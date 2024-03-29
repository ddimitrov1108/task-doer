import cn from "@/lib/cn";
import { Switch } from "@headlessui/react";
import { IFormField } from "@/lib/interfaces/form";
import Label from "./Label";

const SwitchField = ({
  label = "",
  fullWidth = false,
  field,
  disabled,
  containerClassName,
  form: { setFieldValue },
}: IFormField<boolean> & React.ComponentProps<"input">) => {
  return (
    <Switch.Group
      as="div"
      className={cn(
        "flex items-center gap-2 mb-4",
        fullWidth ? "w-full" : "w-fit",
        containerClassName
      )}
    >
      <Label className="pb-2" htmlFor={field.name} text={label} />

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
export default SwitchField;
