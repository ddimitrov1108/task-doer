import { getUserFromServerSession } from "@/lib/auth";
import { NextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";

const ProjectPage = async ({ params }: NextRouteParams) => {
  if (!params?.id || !isUUID(params?.id))
    return (await import("next/navigation")).notFound();

  const user = await getUserFromServerSession();

  if (!user) return (await import("next/navigation")).redirect("/");

  const project = await (
    await import("@/db/ProjectController")
  ).default.get(user.id, params.id);

  return (
    <pre>
      {params?.id}
      {JSON.stringify(project, null, 4)}
    </pre>
  );
};
export default ProjectPage;
