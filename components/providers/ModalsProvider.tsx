"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { LabelModal, ProjectModal } from "../modals";
import { StorageContext } from ".";

interface Props {
  children: ReactNode;
}

interface IModalState {
  isProjectModalOpen: boolean;
  isLabelModalOpen: boolean;
  editMode: boolean;
}

export const ModalsContext = createContext<{
  modalState: IModalState;
  modifyModalState: (state: {
    isProjectModalOpen?: boolean;
    isLabelModalOpen?: boolean;
    editMode?: boolean;
  }) => void;
} | null>(null);

const ModalsProvider = ({ children }: Props) => {
  const storageContext = useContext(StorageContext);

  const [modalState, setModalState] = useState<IModalState>({
    isProjectModalOpen: false,
    isLabelModalOpen: false,
    editMode: false,
  });

  const modifyModalState = (state: {
    isProjectModalOpen?: boolean;
    isLabelModalOpen?: boolean;
    editMode?: boolean;
  }) => {
    setModalState({ ...modalState, ...state });
  };

  const toggleProjectModal = (state: boolean): void => {
    setModalState({ ...modalState, isProjectModalOpen: state });
  };

  const toggleLabelModal = (state: boolean): void => {
    setModalState({ ...modalState, isLabelModalOpen: state });
  };

  const initialProjectState = modalState.editMode
    ? storageContext?.project
    : undefined;
  const initialLabelState = modalState.editMode
    ? storageContext?.label
    : undefined;

  return (
    <ModalsContext.Provider
      value={{
        modalState,
        modifyModalState,
      }}
    >
      <ProjectModal
        open={modalState.isProjectModalOpen}
        setOpen={toggleProjectModal}
        editMode={modalState.editMode}
        initialState={initialProjectState}
        afterSubmit={() =>
          setModalState({ ...modalState, isProjectModalOpen: false })
        }
      />

      <LabelModal
        open={modalState.isLabelModalOpen}
        setOpen={toggleLabelModal}
        editMode={modalState.editMode}
        initialState={initialLabelState}
        afterSubmit={() =>
          setModalState({ ...modalState, isLabelModalOpen: false })
        }
      />

      {children}
    </ModalsContext.Provider>
  );
};
export default ModalsProvider;
