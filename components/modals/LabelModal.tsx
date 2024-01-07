import { IFormModal, ILabelFormValues } from "@/lib/interfaces";
import { Modal } from "../ui";
import { AtSign } from "lucide-react";
import { LabelForm } from "../forms";

const LabelModal = ({
  isOpen,
  setIsOpen,
  editMode = false,
  initialState = null,
  afterSubmit,
}: IFormModal<ILabelFormValues>) => {
  return (
    <Modal
      modalTitle={
        <div className="flex items-center gap-2">
          <div className="text-2xl text-main">
            <AtSign />
          </div>
          {editMode ? "Edit Label" : "New Label"}
        </div>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="max-w-sm"
      bodyClassName="pt-4"
    >
      <LabelForm
        editMode={editMode}
        initialState={initialState}
        afterSubmit={afterSubmit}
      />
    </Modal>
  );
};
export default LabelModal;
