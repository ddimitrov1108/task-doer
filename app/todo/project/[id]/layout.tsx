import ProjectProvider from "@/components/providers/ProjectProvider";
import { getUserFromServerSession } from "@/lib/auth";
import { NextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";
import { redirect, notFound } from "next/navigation";

interface Props extends NextRouteParams {
  children: React.ReactNode;
}

const ProjectLayout = async ({ children, params }: Props) => {
  if (!params?.id || !isUUID(params?.id)) return notFound();

  const user = await getUserFromServerSession();

  if (!user) return redirect("/");

  const project = await (
    await import("@/db/ProjectController")
  ).default.get(user.id, params.id);

  console.log(project);

  return <ProjectProvider>{children}</ProjectProvider>;
};
export default ProjectLayout;
