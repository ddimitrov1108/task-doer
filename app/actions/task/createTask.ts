"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { TaskFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function createTask(
  project_id: string | null,
  values: TaskFormValues
)  {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (project_id && !isUUID(project_id)) return { error: "Invalid fields" };
  if (!values) return { error: "Invalid fields" };
  if (!taskController.validate(values)) return { error: "Invalid fields" };

  try {
    const task = await taskController.create(user.id, project_id, values);
    if (!task) throw new Error("Failed to create Task");

    if (project_id) revalidatePath(`/todo/project/${project_id}`, "page");
    else revalidatePath("/todo");

    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
