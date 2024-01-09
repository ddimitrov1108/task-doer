import { ReactNode } from "react";
import { getUserFromServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { HeaderNav, SideNav } from "@/components";
import { labelController, projectController } from "@/db";
import { ProjectProvider, TaskProvider } from "@/components/providers";
import { IUserData } from "@/lib/interfaces";

interface Props {
  children: ReactNode;
}

const fetchData = async (user_id: string) => {
  return await Promise.all([
    projectController.getList(user_id),
    labelController.getList(user_id),
  ]);
};

const layout = async ({ children }: Props) => {
  const user: IUserData | null = await getUserFromServerSession();

  if (!user) return redirect("/");

  const [projects, labels] = await fetchData(user.id);

  return (
    <ProjectProvider>
      <div className="w-full flex">
        <HeaderNav user={user} navList={{ projects, labels }} />
        <SideNav user={user} navList={{ projects, labels }} />

        <div className="bg-black-dark h-full w-full mt-16 lg:mt-0 lg:ml-96 py-8 px-4 xxs:px-4 lg:px-8 xl:p-12">
          <TaskProvider>{children}</TaskProvider>
        </div>
      </div>
    </ProjectProvider>
  );
};
export default layout;
