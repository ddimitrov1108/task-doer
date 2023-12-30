import { FolderEdit, FolderPlus } from "lucide-react";
import { Modal } from "../ui";
import { ProjectForm } from "../forms";
import { INewProject } from "@/lib/interfaces";

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
  initialState?: INewProject | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

const ProjectModal = ({
  isOpen,
  setIsOpen,
  editMode = false,
  initialState = null,
  afterSubmit,
}: Props) => {
  return (
    <Modal
      modalTitle={
        <div className="flex items-center gap-2">
          <div className="text-2xl text-main">
            {editMode ? <FolderEdit /> : <FolderPlus />}
          </div>
          {editMode ? "Edit Project" : "New Project"}
        </div>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="max-w-sm"
      bodyClassName="pt-4"
    >
      <ProjectForm
        editMode={editMode}
        initialState={initialState}
        afterSubmit={afterSubmit}
      />
    </Modal>
  );
};
export default ProjectModal;
