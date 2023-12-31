"use client";

import { ILabel } from "@/lib/interfaces";
import { MouseEvent, useState } from "react";
import { NavLink } from ".";
import { DisclousureContainer } from "../ui";
import { AtSign, Plus } from "lucide-react";
import LabelModal from "../modals/LabelModal";

interface Props {
  labels: ILabel[];
  onNavElClick?: () => void;
}

const LabelsList = ({ labels, onNavElClick = () => {} }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    onNavElClick();
  };

  const afterSubmitHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <LabelModal
        isOpen={isOpen}
        setIsOpen={() => setIsOpen(!isOpen)}
        afterSubmit={afterSubmitHandler}
      />

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
        bodyClassName="px-2 styled-overflow max-h-[260px] overflow-auto grid gap-1"
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
    </>
  );
};
export default LabelsList;
