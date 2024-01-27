"use client";

import { INavList } from "@/lib/interfaces";
import ProjectsList from "./components/ProjectsList";
import LabelsList from "./components/LabelsList";
import { CheckCheck, InfinityIcon, LandPlot, Star, Sun } from "lucide-react";
import NavLink from "./components/NavLink";
import { v4 as uuidv4 } from "uuid";

const navLinks = [
  {
    id: uuidv4(),
    name: "My Day",
    icon: <Sun size={20} />,
    href: "/todo",
  },
  {
    id: uuidv4(),
    name: "Planned",
    icon: <LandPlot size={20} />,
    href: "/todo/planned",
  },
  {
    id: uuidv4(),
    name: "Important",
    icon: <Star size={20} />,
    href: "/todo/important",
  },

  {
    id: uuidv4(),
    name: "All",
    icon: <InfinityIcon size={20} />,
    href: "/todo/all",
  },
  {
    id: uuidv4(),
    name: "Completed",
    icon: <CheckCheck size={20} />,
    href: "/todo/completed",
  },
];

interface Props {
  navList: INavList;
  onNavElClick?: () => void;
}

const NavigationList = ({ navList, onNavElClick = () => {} }: Props) => {
  return (
    <>
      <div className="grid gap-2">
        {navLinks.map(({ id, name, icon, href }, index) => (
          <NavLink
            key={id}
            href={href}
            title={name}
            text={name}
            onClick={onNavElClick}
            appendIcon={<div className="text-primary-main">{icon}</div>}
            className="font-medium"
            count={navList.count[index]}
          />
        ))}
      </div>
      <ProjectsList projects={navList.projects} onNavElClick={onNavElClick} />
      <LabelsList labels={navList.labels} onNavElClick={onNavElClick} />
    </>
  );
};
export default NavigationList;
