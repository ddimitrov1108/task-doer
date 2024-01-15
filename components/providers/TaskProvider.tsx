"use client";

import { ITask } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { useSideBarState, useSound } from "../hooks";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import TaskModal from "../modals/TaskModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
import SideBar from "../ui/SideBar";
import TaskDetailsContainer from "../task/TaskDetailsContainer";
interface Props {
  children: React.ReactNode;
}

interface IModalState {
  open: boolean;
  editMode: boolean;
}

export const TaskContext = createContext<{
  setTask: React.Dispatch<React.SetStateAction<ITask | undefined>>;
  setTaskModal: React.Dispatch<React.SetStateAction<IModalState>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCompleted: (task_id: string, completed: boolean) => Promise<void>;
  setImportant: (task_id: string, completed: boolean) => Promise<void>;
} | null>(null);

const TaskProvider = ({ children }: Props) => {
  const router = useRouter();
  const [task, setTask] = useState<ITask>();
  const [taskModal, setTaskModal] = useState<IModalState>({
    open: false,
    editMode: false,
  });
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openTaskDetails, setOpenTaskDetails] = useSideBarState(false);
  const [isPlaying, playSound, stopSound] = useSound(
    "http://localhost:3000/task-completed.wav"
  );

  const setCompleted = async (task_id: string, completed: boolean) => {
    console.log(task_id, completed);
  };

  const setImportant = async (task_id: string, completed: boolean) => {
    console.log(task_id, completed);
  };

  const onDeleteTaskHandler = async () => {
    setOpenDeleteModal(true);
  };

  // const setCompleted = async (task: Task): Promise<void> => {
  //   await fetch(`/api/tasks/${task.id}/complete`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       completed: !task.completed,
  //       editLabels: false,
  //     }),
  //   })
  //     .then((data) => data.json())
  //     .then(({ error }) => {
  //       if (error) throw error;

  //       if (!task.completed) playSound();
  //       router.refresh();
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };

  // const setImportant = async (task: Task): Promise<void> => {
  //   await fetch(`/api/tasks/${task.id}/important`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       important: !task.important,
  //       editLabels: false,
  //     }),
  //   })
  //     .then((data) => data.json())
  //     .then(({ error }) => {
  //       if (error) throw error;

  //       router.refresh();
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };

  // const deleteTask = async (): Promise<void> => {
  //   await fetch(`/api/tasks/${selectedTask?.id}`, {
  //     method: "DELETE",
  //   })
  //     .then((data) => data.json())
  //     .then(({ error }) => {
  //       if (error) throw error;
  //       toast.success("Task deleted");
  //       router.refresh();
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });

  // };

  return (
    <TaskContext.Provider
      value={{
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
        initialState={taskModal.editMode ? task : undefined}
        editMode={taskModal.editMode}
        afterSubmit={() => setTaskModal({ ...taskModal, open: false })}
      />

      <DeleteConfirmationModal
        message={`Are you sure you want to delete "${task?.name}"?`}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSubmit={onDeleteTaskHandler}
      />

      <SideBar
        open={openTaskDetails}
        setOpen={() => setOpenTaskDetails(false)}
        showFrom="right"
        containerClassName="xl:hidden"
        headerClassName="py-4 px-6"
        bodyClassName="py-10 px-6"
        title="Task Details"
      >
        <pre>{JSON.stringify(task, null, 4)}</pre>
      </SideBar>

      <div className={cn(task && "transition-all xl:mr-96")}>
        {children}

        <TaskDetailsContainer
          task={task}
          open={openTaskDetails}
          setOpen={() => setOpenTaskDetails(false)}
        />
      </div>
    </TaskContext.Provider>
  );
};
export default TaskProvider;
