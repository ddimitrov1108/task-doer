"use client";

import { IProject } from "@/lib/interfaces";
import { createContext, useEffect, useState } from "react";
import { DeleteConfirmationModal, ProjectModal } from "../modals";
import { deleteProject } from "@/app/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
  initValue: IProject;
  children: React.ReactNode;
}

export const ProjectContext = createContext<{
  setProject: React.Dispatch<React.SetStateAction<IProject>>;
  setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const ProjectProvider = ({ initValue, children }: Props) => {
  const router = useRouter();
  const [project, setProject] = useState<IProject>(initValue);
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const onDeleteProjectHandler = async () => {
    await deleteProject(project.id)
      .then(({ error }) => {
        if (error) throw error;

        toast.success("Project deleted successfully!");
        setOpenDeleteModal(false);
        router.replace("/todo");
      })
      .catch((e: string) => {
        console.error(e);
      });
  };

  useEffect(() => {
    setProject(initValue);
  }, [initValue]);

  return (
    <ProjectContext.Provider
      value={{
        setProject,
        setOpenProjectModal,
        setOpenDeleteModal,
      }}
    >
      <ProjectModal
        open={openProjectModal}
        setOpen={setOpenProjectModal}
        editMode={true}
        initialState={project}
        afterSubmit={() => setOpenProjectModal(false)}
      />

      <DeleteConfirmationModal
        message="Do you want to delete this project? All tasks will be deleted."
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSubmit={onDeleteProjectHandler}
      />

      {children}
    </ProjectContext.Provider>
  );
};
export default ProjectProvider;
