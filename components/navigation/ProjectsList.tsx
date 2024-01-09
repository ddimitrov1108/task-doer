"use client";

import { MouseEvent, useContext } from "react";
import { NavLink } from ".";
import { DisclousureContainer } from "../ui";
import { Plus } from "lucide-react";
import { IProject } from "@/lib/interfaces";
import { ModalsContext } from "../providers";

interface Props {
  projects: IProject[];
  onNavElClick?: () => void;
}

const ProjectsList = ({ projects, onNavElClick = () => {} }: Props) => {
  const modalsContext = useContext(ModalsContext);

  const onClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    modalsContext?.setEditMode(false);
    modalsContext?.setOpenProjectModal(true);
    onNavElClick();
  };

  return (
    <DisclousureContainer
      title="Projects"
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
      {projects.map(({ id, name, color }) => (
        <NavLink
          key={id}
          href={`/todo/project/${id}`}
          text={name}
          onClick={onNavElClick}
          appendIcon={
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color }}
            ></div>
          }
          className=""
        />
      ))}
    </DisclousureContainer>
  );
};
export default ProjectsList;
