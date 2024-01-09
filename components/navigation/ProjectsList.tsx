"use client";

import { MouseEvent, useContext, useState } from "react";
import { ProjectModal } from "../modals";
import { NavLink } from ".";
import { DisclousureContainer } from "../ui";
import { Plus } from "lucide-react";
import { IProject } from "@/lib/interfaces";
import { ProjectContext } from "../providers";

interface Props {
  projects: IProject[];
  onNavElClick?: () => void;
}

const ProjectsList = ({ projects, onNavElClick = () => {} }: Props) => {
  const projectContext = useContext(ProjectContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClickHandler = (e: MouseEvent) => {
    e.preventDefault();
    projectContext?.setEditMode(false);
    projectContext?.setIsOpenProjectModal(true);
    onNavElClick();
  };

  const afterSubmitHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ProjectModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        afterSubmit={afterSubmitHandler}
      />

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
    </>
  );
};
export default ProjectsList;
