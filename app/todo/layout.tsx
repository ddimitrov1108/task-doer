import { ReactNode } from "react";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { HeaderNav, SideNav } from "@/components";
import { labelController, projectController } from "@/db";
import { TaskProvider } from "@/components/providers";
import { ILabel, IProject, IUserSession } from "@/lib/interfaces";

interface Props {
  children: ReactNode;
}

type FetchType = [IProject[], ILabel[]];

const fetchData = async (userId: number): Promise<FetchType> => {
  return await Promise.all([
    projectController.getList(userId),
    labelController.getList(userId),
  ]);
};

const layout = async ({ children }: Props) => {
  const session: IUserSession | null = await getServerSession(authConfig);

  if (!session || !session.user || !session.user.id) return redirect("/");

  const [projects, labels]: FetchType = await fetchData(
    parseInt(session.user.id)
  );

  return (
    <div className="w-full flex">
      <HeaderNav user={session.user} navList={{ projects, labels }} />
      <SideNav user={session.user} navList={{ projects, labels }} />

      <div className="bg-black-dark h-full w-full mt-16 lg:mt-0 lg:ml-96 py-8 px-4 xxs:px-4 lg:px-8 xl:p-12">
        <TaskProvider>{children}</TaskProvider>
      </div>
    </div>
  );
};
export default layout;
