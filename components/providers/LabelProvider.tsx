"use client";

import { useRouter } from "next/navigation";
import { LabelContext } from "../context/LabelContext";
import { ILabel } from "@/lib/interfaces";
import { useState } from "react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const LabelModal = dynamic(() => import("../modals/LabelModal"));
const DeleteConfirmationModal = dynamic(
  () => import("../modals/DeleteConfirmationModal")
);

interface Props {
  children: React.ReactNode;
}

const ProjectProvider = ({ children }: Props) => {
  const router = useRouter();
  const [label, setLabel] = useState<ILabel>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const onAfterEditHandler = () => setOpenEditModal(false);
  const onAfterDeleteHandler = async () => {
    if (!label) {
      toast.error("Something went wrong. Please try again later");
      setOpenDeleteModal(false);
      return;
    }

    const { deleteLabel } = await import("@/app/actions/label/deleteLabel");

    await deleteLabel(label.id)
      .then(({ error }) => {
        if (error) throw error;

        toast.success("Label deleted successfully!");
        setOpenDeleteModal(false);
        router.replace("/todo");
      })
      .catch((e: string) => {
        console.error(e);
      });
  };

  return (
    <>
      <LabelModal
        open={openEditModal}
        setOpen={setOpenEditModal}
        editMode={true}
        initialState={label}
        afterSubmit={onAfterEditHandler}
      />

      <DeleteConfirmationModal
        message="Do you want to delete this Label? It will be removed from all tasks."
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSubmit={onAfterDeleteHandler}
      />

      <LabelContext.Provider
        value={{
          setLabel,
          setOpenEditModal,
          setOpenDeleteModal,
        }}
      >
        {children}
      </LabelContext.Provider>
    </>
  );
};
export default ProjectProvider;
