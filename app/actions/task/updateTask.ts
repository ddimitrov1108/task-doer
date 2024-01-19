"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { TaskFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function updateTask(
  task_id: string,
  values: TaskFormValues
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(task_id) || !values) return { error: "Bad Request" };
  if (!taskController.validate(values)) return { error: "Invalid fields" };

  try {
    const updatedTask = await taskController.update(user.id, {
      ...values,
      id: task_id,
      due_date: new Date(values.due_date),
    });

    if (!updatedTask) throw new Error("Failed to update task");

    revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
