"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { LabelModal, ProjectModal } from "../modals";
import { StorageContext } from ".";

interface Props {
  children: ReactNode;
}

export const ModalsContext = createContext<{
  setOpenLabelModal: Dispatch<SetStateAction<boolean>>;
  setOpenProjectModal: Dispatch<SetStateAction<boolean>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
} | null>(null);

const ModalsProvider = ({ children }: Props) => {
  const storageContext = useContext(StorageContext);

  const [openLabelModal, setOpenLabelModal] = useState<boolean>(false);
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <ModalsContext.Provider
      value={{
        setOpenProjectModal,
        setOpenLabelModal,
        setEditMode,
      }}
    >
      <ProjectModal
        open={openProjectModal}
        setOpen={setOpenProjectModal}
        editMode={editMode}
        initialState={storageContext?.project}
        afterSubmit={() => setOpenProjectModal(false)}
      />

      <LabelModal
        open={openLabelModal}
        setOpen={setOpenLabelModal}
        editMode={editMode}
        initialState={storageContext?.label}
        afterSubmit={() => setOpenLabelModal(false)}
      />

      {children}
    </ModalsContext.Provider>
  );
};
export default ModalsProvider;
