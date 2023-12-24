"use client";

import { useEffect, useRef, useState } from "react";
import { ErrorMessage, Label } from ".";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { InputProps } from "@/lib/interfaces";

const PasswordField = ({
  label,
  subLabel,
  type = "password",
  className,
  field,
  form: { touched, errors },
  fullWidth,
  disabled,
  ...restProps
}: InputProps<string>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const setEndOfInput = () => {
    if (!inputRef.current) return;

    const length = inputRef.current.value.length;

    if (length > 0)
      setTimeout(() => {
        if (!inputRef.current) return;

        inputRef.current.selectionStart = inputRef.current.selectionEnd =
          length;
      });
  };

  const PasswordIconClickHandler = () => {
    if (!inputRef.current) return;

    setIsVisible(!isVisible);
    inputRef.current.focus();
  };

  useEffect(() => {
    if (disabled && isVisible) setIsVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  useEffect(() => {
    if (inputRef.current)
      inputRef.current.addEventListener("focus", () => setEndOfInput(), false);

    return () => {
      if (!inputRef.current) return;

      // eslint-disable-next-line react-hooks/exhaustive-deps
      inputRef.current.removeEventListener(
        "focus",
        () => setEndOfInput(),
        false
      );
    };
  }, []);

  return (
    <div className={cn("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label
        className="pb-2"
        htmlFor={field.name && field.name.toString()}
        label={label}
        subLabel={subLabel}
      />

      <div className="relative">
        <button
          tabIndex={-1}
          type="button"
          disabled={disabled}
          className="text-main transition-all bg-transparent absolute top-3 right-3 rounded-full select-none outline-none"
          onClick={PasswordIconClickHandler}
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </button>

        <input
          ref={inputRef}
          disabled={disabled}
          type={isVisible && !disabled ? "text" : "password"}
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
      </div>

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage message={errors[field.name]} />
      )}
    </div>
  );
};
export default PasswordField;
