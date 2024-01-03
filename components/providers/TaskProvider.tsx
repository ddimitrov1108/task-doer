"use client";

import { ITask } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { useSideBarState, useSound } from "../hooks";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
}

export const TaskContext = createContext<{
  selectedTask: ITask | undefined;
  setSelectedTask: Dispatch<SetStateAction<ITask | undefined>>;
  setCompleted: (task: ITask) => Promise<void>;
  setImportant: (task: ITask) => Promise<void>;
  setOpenNewTaskModal: Dispatch<SetStateAction<boolean>>;
  setOpenTaskEditModal: Dispatch<SetStateAction<boolean>>;
  setOpenDeleteTaskModal: Dispatch<SetStateAction<boolean>>;
  setIsSideDetailsOpen: Dispatch<SetStateAction<boolean>>;
} | null>(null);

const TaskProvider = ({ children }: Props) => {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState<ITask>();
  const [openNewTaskModal, setOpenNewTaskModal] = useState<boolean>(false);
  const [openDeleteTaskModal, setOpenDeleteTaskModal] =
    useState<boolean>(false);
  const [openTaskEditModal, setOpenTaskEditModal] = useState<boolean>(false);
  const [isSideDetailsOpen, setIsSideDetailsOpen, toggleIsSideDetailsOpen] =
    useSideBarState(false);

  const [isPlaying, playSound, stopSound] = useSound(
    "http://localhost:3000/task-completed.wav"
  );

  const setCompleted = async (task: ITask): Promise<void> => {
    await fetch(`/api/tasks/${task.id}/complete`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !task.completed,
        editLabels: false,
      }),
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;

        if (!task.completed) playSound();
        router.refresh();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const setImportant = async (task: ITask): Promise<void> => {
    await fetch(`/api/tasks/${task.id}/important`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        important: !task.important,
        editLabels: false,
      }),
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;

        router.refresh();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const deleteTask = async (): Promise<void> => {
    await fetch(`/api/tasks/${selectedTask?.id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;
        toast.success("Task deleted.");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error);
      });

    setOpenDeleteTaskModal(false);
  };

  return (
    <TaskContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
        setCompleted,
        setImportant,
        setOpenNewTaskModal,
        setOpenTaskEditModal,
        setOpenDeleteTaskModal,
        setIsSideDetailsOpen,
      }}
    >
      <div className={cn(isSideDetailsOpen && "transition-all xl:mr-96")}>
        {children}
      </div>
    </TaskContext.Provider>
  );
};
export default TaskProvider;
