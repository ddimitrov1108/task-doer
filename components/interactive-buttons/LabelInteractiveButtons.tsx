"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useId } from "react";
import ButtonIcon from "../ui/ButtonIcon";
import { LabelContext } from "../context/LabelContext";
import { ILabel } from "@/lib/interfaces";
import Dropdown from "../ui/Dropdown";
import DropdownListItem from "../ui/DropdownListItem";
import AddTaskButton from "../task/AddTaskButton";

interface Props {
  label: ILabel;
}

const LabelInteractiveButtons = ({ label }: Props) => {
  const labelContext = useContext(LabelContext);

  const labelInteractions = [
    {
      id: useId(),
      name: "Edit",
      icon: <Pencil size={20} />,
      onClick: () => {
        labelContext?.setOpenEditModal(true);
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

  useEffect(() => {
    labelContext?.setLabel(label);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return (
    <div className="min-w-full md:min-w-fit flex items-center justify-between gap-1">
      <AddTaskButton />

      <Dropdown
        showChevron={false}
        buttonContent={
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
