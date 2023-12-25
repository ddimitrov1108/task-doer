"use client";

import { INavList, IUserData } from "@/lib/interfaces";
import { useSideBarState } from "../hooks";
import { IconButton, Logo, SideBar } from "../ui";
import { NavList, UserDropdownMenu } from "./components";
import { Menu } from "lucide-react";

interface Props {
  user: IUserData;
  navList: INavList;
}

interface Props {}
const HeaderNav = ({ user, navList }: Props) => {
  const [isOpen, setIsOpen, toggleIsOpen] = useSideBarState();

  return (
    <header className="bg-black-main shadow-lg shadow-black-dark flex items-center justify-between z-20 fixed top-0 w-full py-3 px-4 lg:hidden">
      <Logo />

      <SideBar
        isOpen={isOpen}
        onClose={toggleIsOpen}
        containerClassName="bg-black-main px-0"
        headerClassName="pt-4 px-4"
        bodyClassName="w-full grid gap-4 px-4 py-4 bg-inherit"
      >
        <UserDropdownMenu user={user} />
        <NavList navList={navList} onNavElClick={toggleIsOpen} />
      </SideBar>

      <IconButton
        className="group lg:hidden flex flex-col items-end gap-1.5 w-[40px]"
        title="Open navigation"
        onClick={toggleIsOpen}
      >
        <div className="transition-all w-full h-[2px] rounded-full bg-gray-400 group-hover:bg-slate-100 group-hover:w-[80%]"></div>
        <div className="transition-all w-[60%] h-[2px] rounded-full bg-gray-400 ml-1.5 group-hover:bg-slate-100 group-hover:w-full"></div>
        <div className="transition-all w-[80%] h-[2px] rounded-full bg-gray-400 group-hover:bg-slate-100 group-hover:w-[60%]"></div>
      </IconButton>
    </header>
  );
};
export default HeaderNav;
