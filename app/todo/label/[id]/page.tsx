import { LabelInteractiveButtons } from "@/components/interactive-buttons";
import { LabelProvider } from "@/components/providers";
import { TasksList } from "@/components/task";
import { PageTitle } from "@/components/ui";
import { labelController } from "@/db";
import { getUserFromServerSession } from "@/lib/auth";
import { INextRouteParams } from "@/lib/interfaces";
import { isUUID } from "@/lib/utils";
import { AtSign } from "lucide-react";
import { notFound, redirect } from "next/navigation";

export const revalidate = 30;

const LabelPage = async ({ params }: INextRouteParams) => {
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
