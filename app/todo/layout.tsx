import { getUserFromServerSession } from "@/lib/auth";
import HeaderNavigation from "@/components/navigation/HeaderNavigation";
import SideNavigation from "@/components/navigation/SideNavigation";

interface Props {
  children: React.ReactNode;
}

const TodoLayout = async ({ children, modal }: Props) => {
  const user = await getUserFromServerSession();

  if (!user) return (await import("next/navigation")).redirect("/");

  const [projects, labels] = await Promise.all([
    (await import("@/db/ProjectController")).default.getList(user.id),
    (await import("@/db/LabelController")).default.getList(user.id),
  ]);

  return (
    <div className="w-full flex">
      <HeaderNavigation user={user} navList={{ projects, labels }} />
      <SideNavigation user={user} navList={{ projects, labels }} />

      <div className="bg-black-dark h-full w-full mt-16 lg:mt-0 lg:ml-96 py-8 px-4 xxs:px-4 lg:px-8 xl:p-12">
        {children}
      </div>
    </div>
  );
};
export default TodoLayout;
