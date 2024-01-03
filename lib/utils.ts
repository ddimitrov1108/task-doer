import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { hexColorRegex, sectionNameRegex } from "./regex";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const validateIdParam = (
  id: string | null | undefined
): boolean => {
  return !!id && !!parseInt(id);
};

export const validateProjectValues = (values: {
  name: string | null | undefined;
  color: string | null | undefined;
}): boolean => {
  if (!values.name || !values.color) return false;

  try {
    if (
      !sectionNameRegex.test(values.name) ||
      !hexColorRegex.test(values.color)
    )
      return false;
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};

export const validateLabelValues = (name: string): boolean => {
  if (!name) return false;

  try {
    if (!sectionNameRegex.test(name)) return false;
  } catch (e) {
    console.log(e);
    return false;
  }

  return true;
};
