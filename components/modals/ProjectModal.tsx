import { FolderEdit, FolderPlus } from "lucide-react";
import { Modal } from "../ui";
import { ProjectForm } from "../forms";
import { IFormModal } from "@/lib/interfaces";

interface INewProject {
  name: string;
  color: string;
}

const ProjectModal = ({
  isOpen,
  setIsOpen,
  editMode = false,
  initialState = null,
  afterSubmit,
}: IFormModal<INewProject>) => {
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
