import { ProjectInteractiveButtons } from "@/components/interactive-buttons";
import { TasksList } from "@/components/task";
import { projectController } from "@/db";
import { getUserFromServerSession } from "@/lib/auth";
import { INextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

export const revalidate = 30;

const ProjectPage = async ({ params }: INextRouteParams) => {
  if (!params.id || !isUUID(params.id)) return notFound();

  const user = await getUserFromServerSession();

  if (!user) return redirect("/");

  const project = await projectController.get(user.id, params.id);

  if (!project) return notFound();

  return (
    <div>
      <ProjectInteractiveButtons />
      <TasksList tasks={project.tasks} />
    </div>
  );
};

export default ProjectPage;
