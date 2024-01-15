"use client";

import { Label } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import LabelModal from "../modals/LabelModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";

interface Props {
  initValue: Label;
  children: React.ReactNode;
}

export const LabelContext = createContext<{
  setLabel: React.Dispatch<React.SetStateAction<Label>>;
  setOpenLabelModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const LabelProvider = ({ initValue, children }: Props) => {
  const router = useRouter();
  const [label, setLabel] = useState<Label>(initValue);
  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const onDeleteLabelHandler = async () => {
    if (!label) {
      toast.error("Something went wrong. Please try again later");
      setOpenDeleteModal(false);
      return;
    }

    const { deleteLabel } = await import("@/app/actions");

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

  useEffect(() => {
    setLabel(initValue);
  }, [initValue]);

  return (
    <LabelContext.Provider
      value={{
        setLabel,
        setOpenLabelModal,
        setOpenDeleteModal,
      }}
    >
      <LabelModal
        open={openLabelModal}
        setOpen={setOpenLabelModal}
        editMode={true}
        initialState={label}
        afterSubmit={() => setOpenLabelModal(false)}
      />

      <DeleteConfirmationModal
        message="Do you want to delete this label? Label will be removed from associated tasks."
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onSubmit={onDeleteLabelHandler}
      />

      {children}
    </LabelContext.Provider>
  );
};
export default LabelProvider;
