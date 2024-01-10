"use client";

import { useContext, useId, useState } from "react";
import { ModalsContext, StorageContext } from "../providers";
import { useRouter } from "next/navigation";
import { DeleteConfirmationModal } from "../modals";
import { AddTaskButton } from "../task";
import { Dropdown, DropdownListItem, IconButton } from "../ui";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const LabelInteractiveButtons = () => {
  const storageContext = useContext(StorageContext);
  const modalsContext = useContext(ModalsContext);

  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const labelInteractions = [
    {
      id: useId(),
      name: "Edit",
      icon: <Pencil size={20} />,
      onClick: () => {
        modalsContext?.modifyModalState({
          editMode: true,
          isLabelModalOpen: true,
        });
      },
      className: "text-light hover:text-white",
      iconClassName: "text-primary-main",
    },
    {
      id: useId(),
      name: "Delete",
      icon: <Trash2 size={20} />,
      onClick: () => {
        setOpen(true);
      },
      className: "text-error-main",
      iconClassName: "text-error-main",
    },
  ];

  const deleteLabel = async () => {
    if (!storageContext?.label) return;

    await fetch(`/api/label/${storageContext?.label.id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;

        storageContext?.setLabel(undefined);
        toast("Label deleted successfully!");
        router.replace("/todo");
        router.refresh();
      })
      .catch((error) => {
        toast(error);
      });

    setOpen(false);
  };

  return (
    <>
      <DeleteConfirmationModal
        message="Do you want to delete this label? Label will be removed from associated tasks."
        open={open}
        setOpen={setOpen}
        onSubmit={deleteLabel}
      />

      <div className="min-w-full md:min-w-fit flex items-center justify-between gap-1">
        <AddTaskButton />

        <Dropdown
          showChevron={false}
          btn={
            <IconButton className="transition-all text-2xl bg-black-main text-light">
              <MoreHorizontal size={20} />
            </IconButton>
          }
        >
          {labelInteractions.map(
            ({ id, className, iconClassName, onClick, ...item }) => (
              <DropdownListItem
                key={id}
                as="button"
                onClick={onClick}
                item={item}
                className={className}
                iconClassName={iconClassName}
              />
            )
          )}
        </Dropdown>
      </div>
    </>
  );
};
export default LabelInteractiveButtons;
