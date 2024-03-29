import { IFormField } from "@/lib/interfaces/form";
import cn from "@/lib/cn";
import Label from "./Label";
import dynamic from "next/dynamic";

const FormErrorMessage = dynamic(() => import("./FormErrorMessage"));

const colorPickerColors = [
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
  containerClassName,
  field,
  form: { setFieldValue, touched, errors },
  fullWidth,
  disabled,
}: IFormField<string>) => {
  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) =>
    setFieldValue(field.name, e.currentTarget.value);

  return (
    <div
      className={cn("mb-4", fullWidth ? "w-full" : "w-fit", containerClassName)}
    >
      <Label className="pb-2" htmlFor={field.name} text={label} />

      <div className="w-full flex flex-wrap gap-1">
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

      {errors[field.name] && touched[field.name] ? (
        <FormErrorMessage message={errors[field.name]} />
      ) : null}
    </div>
  );
};
export default ColorPickerField;
