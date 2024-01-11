"use client";

import { ILabel } from "@/lib/interfaces";
import { useState } from "react";
import { NavLink } from ".";
import { DisclousureContainer } from "../ui";
import { AtSign, Plus } from "lucide-react";
import { LabelModal } from "../modals";

interface Props {
  labels: ILabel[];
  onNavElClick?: () => void;
}

const LabelsNavList = ({ labels, onNavElClick = () => {} }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavElClick();
    setOpen(false);
  };
  return (
    <>
      <LabelModal
        open={open}
        setOpen={setOpen}
        afterSubmit={() => setOpen(false)}
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
    </>
  );
};
export default LabelsNavList;
