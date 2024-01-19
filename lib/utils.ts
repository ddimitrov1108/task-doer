import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { validate } from "uuid";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const isUUID = (id: string | null | undefined): boolean => {
  return !!id && validate(id);
};
