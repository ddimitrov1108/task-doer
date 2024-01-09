"use client";

import { ILabel } from "@/lib/interfaces";
import { MouseEvent, useContext } from "react";
import { NavLink } from ".";
import { DisclousureContainer } from "../ui";
import { AtSign, Plus } from "lucide-react";
import { ModalsContext } from "../providers";

interface Props {
  labels: ILabel[];
  onNavElClick?: () => void;
}

const LabelsList = ({ labels, onNavElClick = () => {} }: Props) => {
  const modalsContext = useContext(ModalsContext);

  const onClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    modalsContext?.setEditMode(false);
    modalsContext?.setOpenLabelModal(true);
    onNavElClick();
  };
  return (
    <DisclousureContainer
      title="Labels"
      appendToTitle={
        <button
          className="text-xl text-main hover:text-primary-main"
          onClick={onClickHandler}
        >
          <Plus size={20} />
        </button>
      }
      btnClassName="p-2 rounded-lg justify-between"
      bodyClassName="px-2 styled-overflow max-h-[240px] overflow-auto grid gap-1"
      open
    >
      {labels.map(({ id, name }) => (
        <NavLink
          key={id}
          href={`/todo/label/${id}`}
          text={name}
          onClick={onNavElClick}
          appendIcon={<AtSign size={16} className="text-primary-main" />}
        />
      ))}
    </DisclousureContainer>
  );
};
export default LabelsList;
