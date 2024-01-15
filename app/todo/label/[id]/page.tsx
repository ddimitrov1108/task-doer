import LabelInteractiveButtons from "@/components/interactive-buttons/LabelInteractiveButtons";
import LabelProvider from "@/components/providers/LabelProvider";
import TasksList from "@/components/task/TasksList";
import PageTitle from "@/components/ui/PageTitle";
import labelController from "@/db/LabelController";
import { getUserFromServerSession } from "@/lib/auth";
import { NextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";
import { AtSign } from "lucide-react";
import { notFound, redirect } from "next/navigation";

export const revalidate = 30;

const LabelPage = async ({ params }: NextRouteParams) => {
  if (!params.id || !isUUID(params.id)) return notFound();

  const user = await getUserFromServerSession();

  if (!user) return redirect("/");

  const label = await labelController.get(user.id, params.id);

  if (!label) return notFound();

  return (
    <LabelProvider
      initValue={{
        id: label.id,
        name: label.name,
      }}
    >
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageTitle label="label" className="flex gap-2 items-center">
          <AtSign size={20} className="text-primary-main" />
          <h1>{label.name}</h1>
        </PageTitle>

        <LabelInteractiveButtons/>
      </div>

      <TasksList tasks={label.tasks} />
    </LabelProvider>
  );
};

export default LabelPage;
