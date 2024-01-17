"use client";

import { INavList, IUserData } from "@/lib/interfaces";
import useSideBarState from "../hooks/useSideBarState";
import { AlignRight } from "lucide-react";
import dynamic from "next/dynamic";
import ButtonIcon from "../ui/ButtonIcon";
import UserDropdown from "./components/UserDropdown";
import NavigationList from "./NavigationList";

const SideBar = dynamic(() => import("../ui/SideBar"));
const Logo = dynamic(() => import("../ui/Logo"), {
  loading: () => <span></span>,
});

interface Props {
  user: IUserData;
  navList: INavList;
}

const HeaderNavigation = ({ user, navList }: Props) => {
  const [open, setOpen, toggleIsOpen] = useSideBarState();

  return (
    <header className="bg-black-main shadow-lg shadow-black-dark flex items-center justify-between z-20 fixed top-0 w-full py-2 px-4 lg:hidden">
      <Logo />

      <SideBar
        open={open}
        setOpen={setOpen}
        containerClassName="bg-black-main px-0"
        headerClassName="pt-4 px-4"
        bodyClassName="w-full grid gap-4 px-4 py-4 bg-inherit"
      >
        <UserDropdown user={user} />
        <NavigationList navList={navList} onNavElClick={() => setOpen(false)} />
      </SideBar>

      <ButtonIcon
        type="button"
        className="group lg:hidden flex flex-col items-end gap-1.5 min-w-[35px]"
        title="Open navigation"
        onClick={toggleIsOpen}
      >
        <AlignRight />
      </ButtonIcon>
    </header>
  );
};
export default HeaderNavigation;
