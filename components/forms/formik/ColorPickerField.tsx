"use client";

import { IFormInput } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { Label } from ".";
import dynamic from "next/dynamic";

const ErrorMessage = dynamic(() => import("./ErrorMessage"));

const colorPickerColors: string[] = [
  "#b8255f",
  "#db4035",
  "#ff9933",
  "#fad000",
  "#afb83b",
  "#7ecc49",
  "#299438",
  "#6accbc",
  "#158fad",
  "#14aaf5",
  "#96c3eb",
  "#4073ff",
  "#884dff",
  "#af38eb",
  "#eb96eb",
  "#e05194",
  "#ff8d85",
  "#808080",
  "#b8b8b8",
  "#ccac93",
];

const ColorPickerField = ({
  label = "",
  className,
  field,
  form: { setFieldValue, touched, errors },
  fullWidth,
  disabled,
}: IFormInput<string>) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) =>
    setFieldValue(field.name, e.currentTarget.value);

  return (
    <div className={cn("mb-4", className, fullWidth ? "w-full" : "w-fit")}>
      <Label className="pb-2" htmlFor={field.name} label={label} />

      <div className="w-full flex flex-wrap gap-2">
        {colorPickerColors.map((color) => (
          <button
            type="button"
            key={color}
            value={color}
            className="flex justify-center items-center w-7 h-7 rounded-full"
            style={{ backgroundColor: color }}
            onClick={onClickHandler}
            disabled={disabled}
          >
            <div
              className={cn(
                "transition-all rounded-full",
                color === field.value ? "bg-black-main p-2" : "bg-inherit p-0"
              )}
            ></div>
          </button>
        ))}
      </div>

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage message={errors[field.name]} />
      )}
    </div>
  );
};
export default ColorPickerField;
