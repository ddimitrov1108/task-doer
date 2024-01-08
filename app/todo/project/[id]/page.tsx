import { ProjectInteractiveButtons } from "@/components/interactive-buttons";
import { ProjectProvider } from "@/components/providers";
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
      <ProjectProvider
        initValue={{
          id: project.id,
          name: project.name,
          color: project.color,
        }}
      >
        <ProjectInteractiveButtons />
        <TasksList tasks={project.tasks} />
      </ProjectProvider>
    </div>
  );
};

export default ProjectPage;
