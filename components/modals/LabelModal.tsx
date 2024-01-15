import { FormModal, LabelFormValues } from "@/lib/interfaces";
import { AtSign } from "lucide-react";
import LabelForm from "../forms/LabelForm";
import Modal from "../ui/Modal";

const LabelModal = ({
  open,
  setOpen,
  editMode = false,
  initialState,
  afterSubmit,
}: FormModal<LabelFormValues>) => {
  return (
    <Modal
      modalTitle={
        <div className="flex items-center gap-2">
          <div className="text-2xl text-main">
            <AtSign size={20}/>
          </div>
          {editMode ? "Edit Label" : "New Label"}
        </div>
      }
      open={open}
      setOpen={setOpen}
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
