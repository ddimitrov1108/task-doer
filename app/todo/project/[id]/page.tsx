import { PageHeader } from "@/components";
import { ProjectInteractiveButtons } from "@/components/interactive-buttons";
import { ProjectProvider } from "@/components/providers";
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
    <ProjectProvider
      init={{
        id: project.id,
        name: project.name,
        color: project.color,
      }}
    >
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageHeader label="project">
          <div className="flex gap-3 items-center">
            <div
              className="min-w-[14px] min-h-[14px] rounded-full"
              style={{ backgroundColor: project.color }}
            ></div>
            {project.name}
          </div>
        </PageHeader>

        <ProjectInteractiveButtons />
      </div>

      <TasksList tasks={project.tasks} />
    </ProjectProvider>
  );
};

export default ProjectPage;
