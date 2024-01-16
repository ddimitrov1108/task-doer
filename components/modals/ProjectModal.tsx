import { FolderEdit, FolderPlus } from "lucide-react";
import Modal from "../ui/Modal";
import ProjectForm from "../forms/ProjectForm";
import { IFormModal, IProjectFormValues } from "@/lib/interfaces";

const ProjectModal = ({
  open,
  setOpen,
  editMode = false,
  initialState,
  afterSubmit,
}: IFormModal<IProjectFormValues>) => {
  return (
    <Modal
      modalTitle={
        <div className="flex items-center gap-2">
          <div className="text-2xl text-main">
            {editMode ? <FolderEdit size={20} /> : <FolderPlus size={20} />}
          </div>
          {editMode ? "Edit Project" : "New Project"}
        </div>
      }
      open={open}
      setOpen={setOpen}
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
