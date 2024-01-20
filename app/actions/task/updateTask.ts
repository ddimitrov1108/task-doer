"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { TaskFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const updateTask = async (task_id: string, values: TaskFormValues) => {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(task_id) || !values) return { error: "Bad Request" };
  if (!taskController.validate(values)) return { error: "Invalid fields" };

  try {
    await taskController.update(user.id, {
      ...values,
      id: task_id,
      due_date: new Date(values.due_date),
    });

    revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
