"use client";

import { IProject } from "@/lib/interfaces";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { DeleteConfirmationModal, ProjectModal } from "../modals";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
}

export const ProjectContext = createContext<{
  setProject: Dispatch<SetStateAction<IProject | undefined>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setIsOpenProjectModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenDeleteConfirmationModal: Dispatch<SetStateAction<boolean>>;
} | null>(null);

const ProjectProvider = ({ children }: Props) => {
  const router = useRouter();
  const [project, setProject] = useState<IProject>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isOpenProjectModal, setIsOpenProjectModal] = useState<boolean>(false);
  const [isOpenDeleteConfirmationModal, setIsOpenDeleteConfirmationModal] =
    useState<boolean>(false);

  const deleteProject = async (): Promise<void> => {
    if (!project) return;

    await fetch(`/api/project/${project.id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;

        toast.success("Project deleted successfully!");
        router.replace("/todo");
        router.refresh();
      })
      .catch((error) => {
        toast.error(error);
      });

    setIsOpenDeleteConfirmationModal(false);
    setProject(undefined);
  };

  return (
    <ProjectContext.Provider
      value={{
        setProject,
        setEditMode,
        setIsOpenProjectModal,
        setIsOpenDeleteConfirmationModal,
      }}
    >
      <DeleteConfirmationModal
        message="Do you want to delete this project? All tasks will be deleted."
        isOpen={isOpenDeleteConfirmationModal}
        setIsOpen={setIsOpenDeleteConfirmationModal}
        onSubmit={deleteProject}
      />

      <ProjectModal
        isOpen={isOpenProjectModal}
        setIsOpen={setIsOpenProjectModal}
        editMode={editMode}
        initialState={editMode ? project : undefined}
        afterSubmit={() => setIsOpenProjectModal(false)}
      />

      {children}
    </ProjectContext.Provider>
  );
};
export default ProjectProvider;
