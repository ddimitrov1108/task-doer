import PageTitle from "@/components/ui/PageTitle";
import projectController from "@/db/ProjectController";
import { getUserFromServerSession } from "@/lib/auth";
import { NextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";

const ProjectInteractiveButtons = dynamic(
  () => import("@/components/interactive-buttons/ProjectInteractiveButtons")
);
const TasksLists = dynamic(() => import("@/components/task/TasksLists"));

const ProjectPage = async ({ params }: NextRouteParams) => {
  if (!params?.id || !isUUID(params?.id)) return notFound();

  const user = await getUserFromServerSession();

  if (!user) return redirect("/");

  const project = await projectController.get(user.id, params.id);

  if (!project) return notFound();

  return (
    <>
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageTitle label="project" className="flex gap-3 items-center">
          <div
            className="min-w-[14px] min-h-[14px] rounded-full"
            style={{ backgroundColor: project.color }}
          ></div>
          <h1 className="truncate ...">{project.name}</h1>
        </PageTitle>

        <ProjectInteractiveButtons
          project={{ id: project.id, name: project.name, color: project.color }}
        />
      </div>

      <TasksLists tasks={project.tasks} />
    </>
  );
};
export default ProjectPage;
