import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { validate } from "uuid";
import { ITask } from "./interfaces";

export function cn(...args: ClassValue[]) {
  return twMerge(clsx(args));
}

export const isUUID = (id: string | null | undefined): boolean => {
  return !!id && validate(id);
};

export const sortByDate = (arr: ITask[]) =>
  arr.sort((a, b) => a.due_date.getTime() - b.due_date.getTime());
