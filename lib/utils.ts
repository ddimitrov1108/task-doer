import { validate } from "uuid";
import { format, isToday, isTomorrow } from "date-fns";
import { enUS } from "date-fns/locale";

export const isUUID = (id: string | null | undefined): boolean => {
  return !!id && validate(id);
};

export const getDueDateText = (dueDate: Date): string => {
  if (isToday(dueDate)) return "Today";
  if (isTomorrow(dueDate)) return "Tomorrow";
  return format(dueDate, "EEE, d MMM, yy", { locale: enUS });
};
