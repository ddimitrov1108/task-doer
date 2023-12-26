"use client";

import { InputProps } from "@/lib/interfaces";
import { Label, ErrorMessage } from ".";
import { cn } from "@/lib/utils";
import { colorPickerColors } from "@/components/constants";

const ColorPickerField = ({
  label,
  subLabel,
  className,
  field,
  form: { setFieldValue, touched, errors },
  fullWidth,
  disabled,
}: InputProps<string>) => {
  const onClickHandler = (color: string) => {
    setFieldValue(field.name, color);
  };

  return (
    <div className={cn("mb-4", className, fullWidth ? "w-full" : "w-fit")}>
      <Label className="pb-2" htmlFor={field.name} text={label} />

      <div className="w-full flex flex-wrap gap-2">
        {colorPickerColors.map((color) => (
          <button
            type="button"
            key={color}
            className="flex justify-center items-center w-7 h-7 rounded-full"
            style={{ backgroundColor: color }}
            onClick={() => onClickHandler(color)}
            disabled={disabled}
          >
            <div
              className={cn(
                "transition-all rounded-full",
                color === field.value ? "bg-black-main p-2.5" : "bg-inherit p-0"
              )}
            ></div>
          </button>
        ))}
      </div>

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage message={errors[field.name]} />
      )}

      {subLabel && (
        <Label
          className="text-main pb-2"
          htmlFor={field.name && field.name.toString()}
          text={subLabel}
        />
      )}
    </div>
  );
};
export default ColorPickerField;
