"use client";

import { ILabel } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { DeleteConfirmationModal, LabelModal } from "../modals";
import { toast } from "sonner";
import { deleteLabel } from "@/app/actions";

interface Props {
  init: ILabel;
  children: React.ReactNode;
}

export const LabelContext = createContext<{
  setLabel: React.Dispatch<React.SetStateAction<ILabel>>;
  setOpenLabelModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const LabelProvider = ({ init, children }: Props) => {
  const router = useRouter();
  const [label, setLabel] = useState<ILabel>(init);
  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const onDeleteLabelHandler = async () => {
    await deleteLabel(label.id)
      .then(({ error }) => {
        if (error) throw error;

        toast("Label deleted successfully!");
        setOpenDeleteModal(false);
        router.replace("/todo");
      })
      .catch((e: string) => {
        console.error(e);
      });
  };

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
