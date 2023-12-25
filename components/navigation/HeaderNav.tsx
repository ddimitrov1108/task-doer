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
    <header className="bg-black-main shadow-lg shadow-black-dark flex items-center justify-between z-20 fixed top-0 w-full py-3 px-6 lg:hidden">
      <Logo />

      <SideBar
        isOpen={isOpen}
        onClose={toggleIsOpen}
        containerClassName="bg-black-main px-0"
        headerClassName="pt-4 px-6"
        bodyClassName="w-full grid gap-4 px-6 py-4 bg-inherit"
      >
        <UserDropdownMenu user={user} />
        <NavList navList={navList} onNavElClick={toggleIsOpen} />
      </SideBar>

      <IconButton onClick={toggleIsOpen}>
        <Menu className="text-2xl" />
      </IconButton>
    </header>
  );
};
export default HeaderNav;
