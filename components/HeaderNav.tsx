"use client";

import { INavList, IUserData } from "@/lib/interfaces";
import { useSideBarState } from "./hooks";
import { NavList, UserDropdownMenu } from "./navigation";
import { ButtonIcon, Logo, SideBar } from "./ui";

interface Props {
  user: IUserData;
  navList: INavList;
}

const HeaderNav = ({ user, navList }: Props) => {
  const [open, setOpen, toggleIsOpen] = useSideBarState();

  return (
    <header className="bg-black-main shadow-lg shadow-black-dark flex items-center justify-between z-20 fixed top-0 w-full py-3 px-4 lg:hidden">
      <Logo />

      <SideBar
        open={open}
        setOpen={setOpen}
        containerClassName="bg-black-main px-0"
        headerClassName="pt-4 px-4"
        bodyClassName="w-full grid gap-4 px-4 py-4 bg-inherit"
      >
        <UserDropdownMenu user={user} />
        <NavList navList={navList} onNavElClick={toggleIsOpen} />
      </SideBar>

      <ButtonIcon
        type="button"
        className="group lg:hidden flex flex-col items-end gap-1.5 min-w-[35px]"
        title="Open navigation"
        onClick={toggleIsOpen}
      >
        <div className="transition-all w-full h-[2px] rounded-full bg-main group-hover:bg-light group-hover:w-[80%]"></div>
        <div className="transition-all w-[60%] h-[2px] rounded-full bg-main group-hover:bg-light ml-1.5 group-hover:w-full"></div>
        <div className="transition-all w-[80%] h-[2px] rounded-full bg-main group-hover:bg-light group-hover:w-[60%]"></div>
      </ButtonIcon>
    </header>
  );
};
export default HeaderNav;
