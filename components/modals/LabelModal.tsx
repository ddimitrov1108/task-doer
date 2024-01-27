import { IFormModal } from "@/lib/interfaces";
import LabelForm from "../forms/LabelForm";
import Modal from "../ui/Modal";
import { LabelFormValues } from "@/lib/form-schemas";
import AtSign from "../ui/AtSign";

const LabelModal = ({
  open,
  setOpen,
  editMode = false,
  initialState,
  afterSubmit,
}: IFormModal<LabelFormValues>) => {
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
