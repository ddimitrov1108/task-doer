import { ReactNode } from "react";
import { authConfig } from "@/lib/auth";
import { IUserSession } from "@/lib/interfaces";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { HeaderNav, SideNav } from "@/components";
import { labelController, projectController } from "@/db";
import { TaskProvider } from "@/components/providers";

interface Props {
  children: ReactNode;
}

const layout = async ({ children }: Props) => {
  const session: IUserSession | null = await getServerSession(authConfig);

  if (!session || !session.user || !session.user.id) return redirect("/");

  const id = Number(session.user.id);

  const [projects, labels] = await Promise.all([
    projectController.getAll(id),
    labelController.getAll(id),
  ]);

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
