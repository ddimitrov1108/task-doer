"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Project } from "@/lib/interfaces";
import DisclousureContainer from "@/components/ui/DisclousureContainer";
import NavLink from "./NavLink";
import dynamic from "next/dynamic";

const ProjectModal = dynamic(() => import("@/components/modals/ProjectModal"));

interface Props {
  projects: Project[];
  onNavElClick?: () => void;
}

const ProjectsList = ({ projects, onNavElClick = () => {} }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ProjectModal
        open={open}
        setOpen={setOpen}
        afterSubmit={() => setOpen(false)}
      />

      <DisclousureContainer
        title="Projects"
        appendToTitle={
          <button
            className="text-xl text-main hover:text-primary-main"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              onNavElClick();
              setOpen(true);
            }}
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
