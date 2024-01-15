"use client";

import { Project } from "@/lib/interfaces";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProjectModal from "../modals/ProjectModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

interface Props {
  initValue: Project;
  children: React.ReactNode;
}

export const ProjectContext = createContext<{
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
  setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const ProjectProvider = ({ initValue, children }: Props) => {
  const router = useRouter();
  const [project, setProject] = useState<Project>();
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const onDeleteProjectHandler = async () => {
    if (!project) {
      toast.success("Something went wrong. Please try again later");
      setOpenDeleteModal(false);
      return;
    }
    const { deleteProject } = await import("@/app/actions");

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
    <>
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

      <ProjectContext.Provider
        value={{
          setProject,
          setOpenProjectModal,
          setOpenDeleteModal,
        }}
      >
        {children}
      </ProjectContext.Provider>
    </>
  );
};
export default ProjectProvider;
