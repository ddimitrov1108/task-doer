"use client";

import { ITask } from "@/lib/interfaces";
import { useState } from "react";
import { TaskContext } from "../context/TaskContext";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import useSound from "../hooks/useSound";

const TaskModal = dynamic(() => import("../modals/TaskModal"));
const DeleteConfirmationModal = dynamic(
  () => import("../modals/DeleteConfirmationModal")
);

interface Props {
  children: React.ReactNode;
}

const TaskProvider = ({ children }: Props) => {
  const [isPlaying, playSound, stopSound] = useSound("/task-completed.wav");
  const [task, setTask] = useState<ITask>();
  const [taskModal, setTaskModal] = useState<{
    open: boolean;
    editMode: boolean;
  }>({
    open: false,
    editMode: false,
  });
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const setCompleted = async (task_id: string, completed: boolean) => {
    const { setTaskCompleted } = await import(
      "@/app/actions/task/setTaskCompleted"
    );

    await setTaskCompleted(task_id, completed)
      .then(({ error }) => {
        if (error) throw error;

        if (completed) {
          if(isPlaying) stopSound();
          
          playSound();
        }
      })
      .catch((e: string) => {
        toast.error(e);
      });
  };

  const setImportant = async (task_id: string, important: boolean) => {
    const { setTaskImportant } = await import(
      "@/app/actions/task/setTaskImportant"
    );

    await setTaskImportant(task_id, important)
      .then(({ error }) => {
        if (error) throw error;
      })
      .catch((e: string) => {
        toast.error(e);
      });
  };

  const onDeleteTaskHandler = async () => {
    if (!task) {
      toast.error("Something went wrong. Please try again later");
      setOpenDeleteModal(false);
      return;
    }

    const { deleteTask } = await import("@/app/actions/task/deleteTask");

    await deleteTask(task.id)
      .then(({ error }) => {
        if (error) throw error;

        toast.success("Task deleted successfully!");
        setOpenDeleteModal(false);
      })
      .catch((e: string) => {
        console.error(e);
      });
  };

  return (
    <>
      <DeleteConfirmationModal
        message={`Are you sure you want to delete "${task?.name}"?`}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSubmit={onDeleteTaskHandler}
      />

      <TaskContext.Provider
        value={{
          task,
          setTask,
          setTaskModal,
          setOpenDeleteModal,
          setCompleted,
          setImportant,
        }}
      >
        <TaskModal
          open={taskModal.open}
          setOpen={() => setTaskModal({ ...taskModal, open: false })}
          initialState={
            taskModal.editMode && task
              ? {
                  ...task,
                  due_date: format(new Date(task.due_date), "yyyy-MM-dd"),
                  description: task.description || null,
                }
              : undefined
          }
          editMode={taskModal.editMode}
          afterSubmit={() => setTaskModal({ ...taskModal, open: false })}
        />

        <div className={cn("h-full")}>{children}</div>
      </TaskContext.Provider>
    </>
  );
};
export default TaskProvider;
//task && "transition-all xl:mr-96"
