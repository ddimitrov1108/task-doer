"use client";

import { INavList } from "@/lib/interfaces";
import { LabelsNavList, NavLink, ProjectsNavList } from ".";
import { CheckCheck, InfinityIcon, LandPlot, Star, Sun } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const taskLinks = [
  {
    id: uuidv4(),
    name: "My Day",
    icon: <Sun size={20} />,
    href: "/todo",
  },
  {
    id: uuidv4(),
    name: "Important",
    icon: <Star size={20} />,
    href: "/todo/important",
  },
  {
    id: uuidv4(),
    name: "Planned",
    icon: <LandPlot size={20} />,
    href: "/todo/planned",
  },
  {
    id: uuidv4(),
    name: "Completed",
    icon: <CheckCheck size={20} />,
    href: "/todo/completed",
  },
  {
    id: uuidv4(),
    name: "All",
    icon: <InfinityIcon size={20} />,
    href: "/todo/all",
  },
];

interface Props {
  navList: INavList;
  onNavElClick?: () => void;
}

const NavList = ({ navList, onNavElClick = () => {} }: Props) => {
  return (
    <>
      <div className="grid gap-2">
        {taskLinks.map(({ id, name, icon, href }) => (
          <NavLink
            key={id}
            href={href}
            title={name}
            text={name}
            onClick={onNavElClick}
            appendIcon={<div className="text-primary-main">{icon}</div>}
            className="font-medium"
          />
        ))}
      </div>

      <ProjectsNavList projects={navList.projects} onNavElClick={onNavElClick} />
      <LabelsNavList labels={navList.labels} onNavElClick={onNavElClick} />
    </>
  );
};
export default NavList;
