"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { TaskFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createTask = async (
  projectId: string | null,
  values: TaskFormValues
) => {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (projectId && !isUUID(projectId)) return { error: "Invalid fields" };
  if (!values) return { error: "Invalid fields" };
  if (!taskController.validate(values)) return { error: "Invalid fields" };

  try {
    const task = await taskController.create(user.id, projectId, values);
    if (!task) throw new Error("Failed to create Task");

    if (projectId) revalidatePath(`/todo/project/${projectId}`, "page");
    else revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
