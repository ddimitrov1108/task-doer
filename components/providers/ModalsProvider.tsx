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
  isTaskModalOpen: boolean;
  editMode: boolean;
}

interface IModifyState {
  isProjectModalOpen?: boolean;
  isLabelModalOpen?: boolean;
  isTaskModalOpen?: boolean;
  editMode?: boolean;
}

export const ModalsContext = createContext<{
  modalState: IModalState;
  modifyModalState: (state: IModifyState) => void;
} | null>(null);

const ModalsProvider = ({ children }: Props) => {
  const storageContext = useContext(StorageContext);

  const [modalState, setModalState] = useState<IModalState>({
    isProjectModalOpen: false,
    isLabelModalOpen: false,
    isTaskModalOpen: false,
    editMode: false,
  });

  const modifyModalState = (state: IModifyState) => {
    setModalState({ ...modalState, ...state });
  };

  const toggleProjectModal = (value: boolean) =>
    modifyModalState({ isProjectModalOpen: value });

  const toggleLabelModal = (value: boolean) =>
    modifyModalState({ isLabelModalOpen: value });

  const toggleTaskModal = (value: boolean) =>
    modifyModalState({ isTaskModalOpen: value });

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
        initialState={modalState.editMode ? storageContext?.project : undefined}
        afterSubmit={() => toggleProjectModal(false)}
      />

      <LabelModal
        open={modalState.isLabelModalOpen}
        setOpen={toggleLabelModal}
        editMode={modalState.editMode}
        initialState={modalState.editMode ? storageContext?.label : undefined}
        afterSubmit={() => toggleLabelModal(false)}
      />

      {/* <TaskModal open={modalState.isTaskModalOpen}
      setOpen={toggleTaskModal}
      editMode={modalState.editMode}
      initialState={initialTaskState}
      afterSubmit={() => toggleTaskModal(false)}
/> */}
      {children}
    </ModalsContext.Provider>
  );
};
export default ModalsProvider;
