import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { validate } from "uuid";
import { format, isToday, isTomorrow } from "date-fns";
import { enUS } from "date-fns/locale";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const isUUID = (id: string | null | undefined): boolean => {
  return !!id && validate(id);
};

export const formatDate = (date: Date): string => {
  return format(date, "EEE, d MMM, yy", { locale: enUS });
};

export const getDueDateText = (dueDate: Date): string => {
  if (isToday(dueDate)) return "Today";
  if (isTomorrow(dueDate)) return "Tomorrow";
  return formatDate(dueDate);
};
