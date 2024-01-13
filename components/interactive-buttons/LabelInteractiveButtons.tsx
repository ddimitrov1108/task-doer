"use client";

import { useContext, useId } from "react";
import { LabelContext } from "../providers";
import { AddTaskButton } from "../task";
import { Dropdown, DropdownListItem, ButtonIcon } from "../ui";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

const LabelInteractiveButtons = () => {
  const labelContext = useContext(LabelContext);

  const labelInteractions = [
    {
      id: useId(),
      name: "Edit",
      icon: <Pencil size={20} />,
      onClick: () => {
        labelContext?.setOpenLabelModal(true);
      },
      className: "text-light hover:text-white",
      iconClassName: "text-primary-main",
    },
    {
      id: useId(),
      name: "Delete",
      icon: <Trash2 size={20} />,
      onClick: () => {
        labelContext?.setOpenDeleteModal(true);
      },
      className: "text-error-main",
      iconClassName: "text-error-main",
    },
  ];

  return (
    <div className="min-w-full md:min-w-fit flex items-center justify-between gap-1">
      <AddTaskButton />

      <Dropdown
        showChevron={false}
        btn={
          <ButtonIcon className="p-2 transition-all bg-black-main text-main">
            <MoreHorizontal size={20} />
          </ButtonIcon>
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
  );
};
export default LabelInteractiveButtons;
