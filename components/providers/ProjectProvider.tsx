"use client";

import { useRouter } from "next/navigation";
import { ProjectContext } from "../context/ProjectContext";
import { IProject } from "@/lib/interfaces";
import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const ProjectModal = dynamic(() => import("../modals/ProjectModal"));
const DeleteConfirmationModal = dynamic(
  () => import("../modals/DeleteConfirmationModal")
);

interface Props {
  children: React.ReactNode;
}

const ProjectProvider = ({ children }: Props) => {
  const router = useRouter();
  const [project, setProject] = useState<IProject>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const onAfterEditHandler = () => setOpenEditModal(false);
  const onAfterDeleteHandler = async () => {
    if (!project) {
      toast.success("Something went wrong. Please try again later");
      setOpenDeleteModal(false);
      return;
    }
    const { deleteProject } = await import(
      "@/app/actions/project/deleteProject"
    );

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

  return (
    <>
      <ProjectModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        editMode={true}
        initialState={project}
        afterSubmit={onAfterEditHandler}
      />

      <DeleteConfirmationModal
        message="Do you want to delete this project? All tasks will be deleted."
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSubmit={onAfterDeleteHandler}
      />

      <ProjectContext.Provider
        value={{
          setProject,
          setOpenEditModal,
          setOpenDeleteModal,
        }}
      >
        {children}
      </ProjectContext.Provider>
    </>
  );
};
export default ProjectProvider;
