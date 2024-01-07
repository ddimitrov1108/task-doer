import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const validateIdParam = (id: string | null | undefined): boolean => {
  return !!id && !!parseInt(id);
};
