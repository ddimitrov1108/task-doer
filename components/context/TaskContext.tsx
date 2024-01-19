import { ITask } from "@/lib/interfaces";
import { createContext } from "react";

export const TaskContext = createContext<{
  task: ITask | undefined,
  setTask: React.Dispatch<React.SetStateAction<ITask | undefined>>;
  setTaskModal: React.Dispatch<React.SetStateAction<{ open: boolean; editMode: boolean }>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleted: (task_id: string, completed: boolean) => Promise<void>;
  setImportant: (task_id: string, completed: boolean) => Promise<void>;
} | null>(null);
