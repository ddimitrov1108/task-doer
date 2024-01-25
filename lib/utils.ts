import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { validate } from "uuid";
import { ITask } from "./interfaces";
import { compareAsc, compareDesc, format, isToday, isTomorrow } from "date-fns";
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

export const sortBy = (arr: ITask[], by: string | undefined) => {
  if (!arr) return [];

  switch (by) {
    case "asc":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "desc":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case "oldest":
      return arr.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
    case "newest":
    default:
      return arr.sort((a, b) => compareDesc(a.dueDate, b.dueDate));
  }
};
