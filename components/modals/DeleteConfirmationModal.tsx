"use client";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import useForm from "../hooks/useForm";
import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  onSubmit: () => Promise<void> | void;
}

const DeleteConfirmationModal = ({
  open,
  setOpen,
  message,
  onSubmit,
}: Props) => {
  const [form, setForm] = useForm();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ error: "", loading: true });
    await onSubmit();
    setForm({ error: "", loading: false });
  };

  const onCloseClickHandler = () => setOpen(false);

  return (
    <Modal
      modalTitle={
        <div className="flex items-center gap-2 text-error-main font-medium">
          <AlertTriangle />
          Delete Confirmation
        </div>
      }
      open={open}
      setOpen={setOpen}
      className="max-w-sm"
      bodyClassName="pt-4"
    >
      <form onSubmit={onSubmitHandler}>
        <div className="mb-6 text-light">{message}</div>

        <div className="flex flex-col-reverse md:flex-row gap-2 justify-between items-center">
          <Button
            variant="text"
            className="flex justify-center"
            disabled={form.loading}
            onClick={onCloseClickHandler}
            fullWidth
          >
            Cancel
          </Button>

          <Button
            variant="error"
            type="submit"
            className="flex justify-center"
            disabled={form.loading}
            loading={form.loading}
            fullWidth
          >
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default DeleteConfirmationModal;
