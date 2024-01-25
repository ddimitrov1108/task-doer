"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { TaskFormValues, taskFormSchema } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function createTask(
  projectId: string | null,
  values: TaskFormValues
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (projectId && !isUUID(projectId)) return { error: "Invalid form data" };
  if (!values) return { error: "Invalid form data" };
  if (!taskFormSchema.safeParse(values).success)
    return { error: "Invalid form data" };

  try {
    const taskController = (await import("@/db/TaskController")).default;

    const task = await taskController.create(user.id, projectId, values);
    if (!task) throw new Error("Failed to create Task");

    if (projectId) revalidatePath(`/todo/project/${projectId}`, "page");
    else revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
