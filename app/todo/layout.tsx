import { getUserFromServerSession } from "@/lib/auth";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import SideNavigation from "@/components/navigation/SideNavigation";
import TaskProvider from "@/components/providers/TaskProvider";
import { redirect } from "next/navigation";
import appController from "@/db/AppController";

interface Props {
  children: React.ReactNode;
}

const TodoLayout = async ({ children }: Props) => {
  const user = await getUserFromServerSession();

  if (!user) return redirect("/");

  const navList = await appController.getNavigation(user.id);

  if(!navList) return redirect("/sign-in");

  return (
    <div className="w-full flex">
      <HeaderNavigation user={user} navList={navList} />
      <SideNavigation user={user} navList={navList} />

      <div className="bg-black-dark h-full w-full mt-8 lg:mt-0 lg:ml-80 xl:ml-96 py-8 px-4 xxs:px-4 lg:px-8 xl:px-12">
        <TaskProvider>{children}</TaskProvider>
      </div>
    </div>
  );
};
export default TodoLayout;
