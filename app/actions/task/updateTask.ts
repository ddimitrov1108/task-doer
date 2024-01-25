"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { TaskFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function updateTask(
  taskId: string,
  values: TaskFormValues
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(taskId) || !values) return { error: "Bad Request" };

  const taskController = (await import("@/db/TaskController")).default;
  if (!taskController.validate(values)) return { error: "Invalid form data" };

  try {
    await taskController.update(user.id, {
      ...values,
      id: taskId,
      dueDate: new Date(values.dueDate),
    });

    revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
