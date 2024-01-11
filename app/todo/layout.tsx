import { getUserFromServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { HeaderNav, SideNav } from "@/components";
import { labelController, projectController } from "@/db";
import { TaskProvider } from "@/components/providers";

interface Props {
  children: React.ReactNode;
}

const TodoLayout = async ({ children }: Props) => {
  const user = await getUserFromServerSession();

  if (!user) return redirect("/");

  const [projects, labels] = await Promise.all([
    projectController.getList(user.id),
    labelController.getList(user.id),
  ]);

  return (
    <div className="w-full flex">
      <HeaderNav user={user} navList={{ projects, labels }} />
      <SideNav user={user} navList={{ projects, labels }} />

      <div className="bg-black-dark h-full w-full mt-16 lg:mt-0 lg:ml-96 py-8 px-4 xxs:px-4 lg:px-8 xl:p-12">
        <TaskProvider>{children}</TaskProvider>
      </div>
    </div>
  );
};
export default TodoLayout;
