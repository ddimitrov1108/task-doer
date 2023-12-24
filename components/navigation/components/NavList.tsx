import { INavList } from "@/lib/interfaces";
import { MouseEventHandler } from "react";
import { NavLink } from ".";
import { Star, Sun } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const taskLinks = [
  {
    id: uuidv4(),
    name: "My Day",
    icon: <Sun />,
    href: "/todo",
  },
  {
    id: uuidv4(),
    name: "Important",
    icon: <Star />,
    href: "/todo/important",
  },
];

interface Props {
  navList: INavList;
  onNavElClick?: MouseEventHandler;
}

const NavList = ({ navList, onNavElClick }: Props) => {
  return (
    <>
      <div className="grid gap-1">
        {taskLinks.map(({ id, name, icon, href }) => (
          <NavLink
            key={id}
            href={href}
            name={name}
            onClick={onNavElClick}
            appendIcon={<div className="text-xl text-primary-main">{icon}</div>}
            className="font-medium"
          />
        ))}
      </div>
    </>
  );
};
export default NavList;
