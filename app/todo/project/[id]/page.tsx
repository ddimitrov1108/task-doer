import { TasksList } from "@/components/task";
import { projectController } from "@/db";
import { authConfig } from "@/lib/auth";
import { IUserSession } from "@/lib/interfaces";
import { validateIdParam } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export const revalidate = 30;

interface Props {
  params: { id?: string | undefined };
}

const ProjectPage = async ({ params }: Props) => {
  if (!params?.id || !validateIdParam(params?.id)) return notFound();

  const session: IUserSession | null = await getServerSession(authConfig);

  if (!session || !session.user || !session.user.id) return redirect("/");

  const project = await projectController.getDetails(
    parseInt(session.user.id),
    parseInt(params.id)
  );

  if (!project) return notFound();

  return (
    <div>
      <TasksList tasks={project.tasks}/>
    </div>
  );
};

export default ProjectPage;
