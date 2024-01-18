import PageTitle from "@/components/ui/PageTitle";
import { getUserFromServerSession } from "@/lib/auth";
import { NextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";
import { AtSign } from "lucide-react";
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

  const label = await (
    await import("@/db/LabelController")
  ).default.get(user.id, params.id);

  if (!label) return notFound();

  return (
    <>
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageTitle label="label" className="flex gap-2 items-center">
          <AtSign size={20} className="text-primary-main" />
          <h1>{label.name}</h1>
        </PageTitle>

        <LabelInteractiveButtons label={{ id: label.id, name: label.name }} />
      </div>

      <TasksLists tasks={label.tasks} />
    </>
  );
};
export default LabelPage;
