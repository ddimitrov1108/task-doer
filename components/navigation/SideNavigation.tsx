import { INavList, IUserData } from "@/lib/interfaces";
import UserDropdown from "./components/UserDropdown";
import NavigationList from "./NavigationList";

interface Props {
  user: IUserData;
  navList: INavList;
}

const SideNavigation = ({ user, navList }: Props) => {
  return (
    <div className="bg-black-main text-white-main z-30 hidden lg:block w-96 duration-300 fixed h-screen overflow-auto p-4 styled-overflow">
      <div className="w-full grid gap-4 bg-inherit">
        <UserDropdown user={user} />
        <NavigationList navList={navList} />
      </div>
    </div>
  );
};
export default SideNavigation;
