"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useId } from "react";
import ButtonIcon from "../ui/ButtonIcon";
import { LabelContext } from "../context/LabelContext";
import { ILabel } from "@/lib/interfaces";
import Dropdown from "../ui/Dropdown";
import DropdownListItem from "../ui/DropdownListItem";

interface Props {
  label: ILabel;
}

const LabelInteractiveButtons = ({ label }: Props) => {
  const labelContext = useContext(LabelContext);

  const labelInteractions = [
    {
      id: useId(),
      name: "Edit",
      icon: <Pencil className="text-primary-main" size={20} />,
      onClick: () => {
        labelContext?.setOpenEditModal(true);
      },
    },
    {
      id: useId(),
      name: "Delete",
      icon: <Trash2 className="text-error-main" size={20} />,
      onClick: () => {
        labelContext?.setOpenDeleteModal(true);
      },
      className: "text-error-main hover:text-error-main",
    },
  ];

  useEffect(() => {
    console.log(label);
    labelContext?.setLabel(label);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return (
    <div className="min-w-full md:min-w-fit flex items-center justify-between gap-1">
      <Dropdown
        showChevron={false}
        buttonContent={
          <ButtonIcon className="p-2 transition-all bg-black-main text-main">
            <MoreHorizontal size={20} />
          </ButtonIcon>
        }
      >
        {labelInteractions.map(({ id, className, onClick, ...item }) => (
          <DropdownListItem
            key={id}
            as="button"
            onClick={onClick}
            item={item}
            className={className}
          />
        ))}
      </Dropdown>
    </div>
  );
};
export default LabelInteractiveButtons;
