"use client";

import { useState } from "react";
import { ILabel } from "@/lib/interfaces";
import { Plus } from "lucide-react";
import DisclousureContainer from "@/components/ui/DisclousureContainer";
import NavLink from "./NavLink";
import dynamic from "next/dynamic";
import AtSign from "@/components/ui/AtSign";

const LabelModal = dynamic(() => import("@/components/modals/LabelModal"));

interface Props {
  labels: ILabel[];
  onNavElClick?: () => void;
}

const LabelsList = ({ labels, onNavElClick = () => {} }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const onAfterSubmitHandler = () => setOpen(false);
  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavElClick();
    setOpen(true);
  };

  return (
    <>
      <LabelModal
        open={open}
        setOpen={setOpen}
        afterSubmit={onAfterSubmitHandler}
      />

      <DisclousureContainer
        title="Labels"
        appendToTitle={
          <button
            className=""
            onClick={onClickHandler}
          >
            <Plus size={20} />
          </button>
        }
        btnClassName="p-2 rounded-lg justify-between"
        bodyClassName="styled-overflow max-h-[240px] overflow-auto grid gap-1"
        open
      >
        {labels.map(({ id, name }) => (
          <NavLink
            key={id}
            href={`/todo/label/${id}`}
            text={name}
            onClick={onNavElClick}
            appendIcon={<AtSign />}
          />
        ))}
      </DisclousureContainer>
    </>
  );
};
export default LabelsList;
