"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useContext, useId, useState } from "react";
import { AddTaskButton } from "../task";
import { Dropdown, DropdownListItem, IconButton } from "../ui";
import { ModalsContext } from "../providers";
import { DeleteConfirmationModal } from "../modals";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { deleteProject } from "@/app/actions";

const ProjectInteractiveButtons = () => {
  const modalsContext = useContext(ModalsContext);
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const projectInteractions = [
    {
      id: useId(),
      name: "Edit",
      icon: <Pencil size={20} />,
      onClick: () => {
        modalsContext?.modifyModalState({
          editMode: true,
          isProjectModalOpen: true,
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

  const onDeleteHandler = async (): Promise<void> => {
    await deleteProject(params.id.toString())
      .then(({ error }) => {
        if (error) throw error;

        toast.success("Project deleted successfully!");
        setOpen(false);
        router.replace("/todo");
      })
      .catch((e: string) => {
        console.error(e);
      });
  };

  return (
    <>
      <DeleteConfirmationModal
        message="Do you want to delete this project? All tasks will be deleted."
        open={open}
        setOpen={setOpen}
        onSubmit={onDeleteHandler}
      />

      <div className="min-w-full md:min-w-fit flex items-center justify-between gap-1">
        <AddTaskButton />

        <Dropdown
          showChevron={false}
          btn={
            <IconButton className="p-2 transition-all bg-black-main text-main">
              <MoreHorizontal size={20} />
            </IconButton>
          }
        >
          {projectInteractions.map(
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
export default ProjectInteractiveButtons;
