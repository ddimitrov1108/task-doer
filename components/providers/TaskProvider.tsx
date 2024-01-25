"use client";

import { ITask } from "@/lib/interfaces";
import { useState } from "react";
import { TaskContext } from "../context/TaskContext";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import useSound from "../hooks/useSound";

const TaskDetailsContainer = dynamic(
  () => import("../task/TaskDetailsContainer")
);
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
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [taskModal, setTaskModal] = useState<{
    open: boolean;
    editMode: boolean;
  }>({
    open: false,
    editMode: false,
  });
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const setCompleted = async (taskId: string, completed: boolean) => {
    const setTaskCompleted = (
      await import("@/app/actions/task/setTaskCompleted")
    ).default;

    await setTaskCompleted(taskId, completed)
      .then(({ error }) => {
        if (error) throw error;

        if (completed) {
          if (openDetails) {
            setOpenDetails(false);
          }

          if (isPlaying) stopSound();

          playSound();
        }
      })
      .catch((e: string) => {
        toast.error(e);
      });
  };

  const setImportant = async (taskId: string, important: boolean) => {
    const setTaskImportant = (
      await import("@/app/actions/task/setTaskImportant")
    ).default;

    await setTaskImportant(taskId, important)
      .then(({ error }) => {
        if (error) throw error;

        if (openDetails) {
          setOpenDetails(false);
        }
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

    const deleteTask = (await import("@/app/actions/task/deleteTask")).default;

    await deleteTask(task.id)
      .then(({ error }) => {
        if (error) throw error;

        toast.success("Task deleted successfully!");
        setTask(undefined);
        setOpenDetails(false);
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
          openDetails,
          setOpenDetails,
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
                  dueDate: format(new Date(task.dueDate), "yyyy-MM-dd"),
                  description: task.description || null,
                }
              : undefined
          }
          editMode={taskModal.editMode}
          afterSubmit={() => setTaskModal({ ...taskModal, open: false })}
        />

        <div className={cn("h-full")}>
          <div
            className={cn(
              openDetails && task ? "transition-all xl:mr-80" : null
            )}
          >
            {children}
          </div>

          <TaskDetailsContainer
            open={!!(openDetails && task)}
            setOpen={() => setOpenDetails(false)}
          />
        </div>
      </TaskContext.Provider>
    </>
  );
};
export default TaskProvider;
//task && "transition-all xl:mr-96"
