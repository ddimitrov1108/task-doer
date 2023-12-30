import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { hexColorRegex, sectionNameRegex } from "./regex";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const validateIdParam = (id: string | null | undefined): boolean => {
  return !!id && !!parseInt(id);
};

export const validateProjectValues = (values: {
  name: string;
  color: string;
}): boolean => {
  if (!values.name || !values.color) return false;

  if (!sectionNameRegex.test(values.name) || !hexColorRegex.test(values.color))
    return false;

  return true;
};
