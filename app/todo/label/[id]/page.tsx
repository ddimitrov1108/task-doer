import { PageHeader } from "@/components";
import { LabelInteractiveButtons } from "@/components/interactive-buttons";
import { TasksList } from "@/components/task";
import { LabelWrapper } from "@/components/wrappers";
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
    <LabelWrapper
      value={{
        id: label.id,
        name: label.name,
      }}
    >
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageHeader label="label">
          <div className="flex gap-3 items-center">
            <AtSign size={20} className="text-primary-main" />
            {label.name}
          </div>
        </PageHeader>

        <LabelInteractiveButtons />
      </div>

      <TasksList tasks={label.tasks} />
      <pre>{JSON.stringify(label, null, 4)}</pre>
    </LabelWrapper>
  );
};

export default LabelPage;
