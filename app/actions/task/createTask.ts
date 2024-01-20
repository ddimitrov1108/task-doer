"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { TaskFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const createTask = async (
  project_id: string | null,
  values: TaskFormValues
) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (project_id && !isUUID(project_id)) throw new Error("Invalid fields");
  if (!values) throw new Error("Invalid fields");
  if (!taskController.validate(values)) throw new Error("Invalid fields");

  const task = await taskController.create(user.id, project_id, values);
  if (!task) throw new Error("Failed to create Task");

  if (project_id) revalidatePath(`/todo/project/${project_id}`, "page");
  else revalidatePath("/todo");
};
