"use client";

import { NavList, UserData } from "@/lib/interfaces";
import { useSideBarState } from "../hooks";
import { AlignRight } from "lucide-react";
import dynamic from "next/dynamic";
import ButtonIcon from "../ui/ButtonIcon";

const Logo = dynamic(() => import("../ui/Logo"), {
  loading: () => <span></span>,
});

const SideBar = dynamic(() => import("../ui/SideBar"));
const UserDropdown = dynamic(() => import("./components/UserDropdown"));

interface Props {
  user: UserData;
  navList: NavList;
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
