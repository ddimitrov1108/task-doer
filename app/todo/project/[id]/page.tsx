import ProjectInteractiveButtons from "@/components/interactive-buttons/ProjectInteractiveButtons";
import ProjectProvider from "@/components/providers/ProjectProvider";
import TaskProvider from "@/components/providers/TaskProvider";
import TasksList from "@/components/task/TasksList";
import PageTitle from "@/components/ui/PageTitle";
import projectController from "@/db/ProjectController";
import { getUserFromServerSession } from "@/lib/auth";
import { NextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";
import { notFound, redirect } from "next/navigation";

export const revalidate = 30;

const ProjectPage = async ({ params }: NextRouteParams) => {
  if (!params.id || !isUUID(params.id)) return notFound();

  const user = await getUserFromServerSession();

  if (!user) return redirect("/");

  const project = await projectController.get(user.id, params.id);

  if (!project) return notFound();

  return (
    <ProjectProvider
      initValue={{
        id: project.id,
        name: project.name,
        color: project.color,
      }}
    >
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageTitle label="project" className="flex gap-3 items-center">
          <div
            className="min-w-[14px] min-h-[14px] rounded-full"
            style={{ backgroundColor: project.color }}
          ></div>
          <h1>{project.name}</h1>
        </PageTitle>

        <ProjectInteractiveButtons />
      </div>
      <TaskProvider>
        <TasksList tasks={project.tasks} />
      </TaskProvider>
    </ProjectProvider>
  );
};

export default ProjectPage;
