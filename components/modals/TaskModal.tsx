import { TaskFormValues } from "@/lib/form-schemas";
import { IFormModal } from "@/lib/interfaces";
import TaskForm from "../forms/TaskForm";
import Modal from "../ui/Modal";
import { FilePen, FilePlus2 } from "lucide-react";

const TaskModal = ({
  open,
  setOpen,
  editMode = false,
  initialState,
  afterSubmit,
}: IFormModal<TaskFormValues>) => {
  return (
    <Modal
      modalTitle={
        <div className="flex items-center gap-2">
          <div className="text-2xl text-main">
            {editMode ? <FilePen size={20} /> : <FilePlus2 size={20} />}
          </div>
          {editMode ? "Edit Task" : "New Task"}
        </div>
      }
      open={open}
      setOpen={setOpen}
      className="max-w-md"
      bodyClassName="pt-4"
    >
      <TaskForm
        editMode={editMode}
        initialState={initialState}
        afterSubmit={afterSubmit}
      />
    </Modal>
  );
};
export default TaskModal;
