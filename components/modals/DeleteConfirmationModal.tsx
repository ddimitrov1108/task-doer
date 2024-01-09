"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import { Button, Modal } from "../ui";
import { useForm } from "../hooks";
import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
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

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setForm({ ...form, loading: true });
    await onSubmit();
    setForm({ ...form, loading: false });
  };

  return (
    <Modal
      modalTitle={
        <div className="flex items-center gap-2">
          <div className="text-2xl text-main">
            <AlertTriangle />
          </div>
          Delete Confirmation
        </div>
      }
      open={open}
      setOpen={setOpen}
      className="max-w-sm"
      bodyClassName="pt-4"
    >
      <form onSubmit={onSubmitHandler}>
        <div className="mb-6">{message}</div>

        <div className="flex flex-col-reverse md:flex-row gap-2 justify-between items-center">
          <Button
            variant="text"
            className="flex justify-center"
            disabled={form.loading}
            onClick={() => setOpen(false)}
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
