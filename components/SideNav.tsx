import { INavList, IUserData } from "@/lib/interfaces";
import { NavList, UserDropdownMenu } from "./navigation";

interface Props {
  user: IUserData;
  navList: INavList;
}

const SideNav = ({ user, navList }: Props) => {
  return (
    <div className="bg-black-main text-white-main z-30 hidden lg:block w-96 duration-300 fixed h-screen overflow-auto p-4 styled-overflow">
      <div className="w-full grid gap-4 bg-inherit">
        <UserDropdownMenu user={user} />
        <NavList navList={navList} />
      </div>
    </div>
  );
};
export default SideNav;
