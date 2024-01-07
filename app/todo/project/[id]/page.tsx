import { TasksList } from "@/components/task";
import { projectController } from "@/db";
import { getUserFromServerSession } from "@/lib/auth";
import { INextRouteParams, IUserData } from "@/lib/interfaces";
import { validateIdParam } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

export const revalidate = 30;

const ProjectPage = async ({ params }: INextRouteParams) => {
  if (!validateIdParam(params?.id)) return notFound();

  const user: IUserData | null = await getUserFromServerSession();

  if (!user) return redirect("/");

  const project = await projectController.get(user.id, Number(params.id));

  if (!project) return notFound();

  return (
    <div>
      <TasksList tasks={project.tasks} />
    </div>
  );
};

export default ProjectPage;
