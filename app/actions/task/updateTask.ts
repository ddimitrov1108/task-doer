"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { TaskFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const updateTask = async (task_id: string, values: TaskFormValues) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (!isUUID(task_id) || !values) throw new Error("Bad Request");
  if (!taskController.validate(values)) throw new Error("Invalid fields");

  await taskController.update(user.id, {
    ...values,
    id: task_id,
    due_date: new Date(values.due_date),
  });

  revalidatePath("/todo");
};
