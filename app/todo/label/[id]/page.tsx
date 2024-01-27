import AtSign from "@/components/ui/AtSign";
import PageTitle from "@/components/ui/PageTitle";
import labelController from "@/db/LabelController";
import { getUserFromServerSession } from "@/lib/auth";
import { NextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";
import dynamic from "next/dynamic";
import { notFound, redirect } from "next/navigation";

const LabelInteractiveButtons = dynamic(
  () => import("@/components/interactive-buttons/LabelInteractiveButtons")
);
const TasksLists = dynamic(() => import("@/components/task/TasksLists"));

const LabelPage = async ({ params }: NextRouteParams) => {
  if (!params?.id || !isUUID(params?.id)) return notFound();

  const user = await getUserFromServerSession();

  if (!user) return redirect("/");

  const label = await labelController.get(user.id, params.id);

  if (!label) return notFound();

  return (
    <>
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageTitle label="label" className="flex gap-2 items-center">
          <AtSign />
          <h1>{label.name}</h1>
        </PageTitle>

        <LabelInteractiveButtons label={{ id: label.id, name: label.name }} />
      </div>

      <TasksLists tasks={label.tasks} />
    </>
  );
};
export default LabelPage;
