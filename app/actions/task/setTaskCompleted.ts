"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const setTaskCompleted = async (task_id: string, completed: boolean) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (!isUUID(task_id)) throw new Error("Bad Request");
  if (typeof completed != "boolean") throw new Error("Invalid fields");

  await taskController.setCompleted(user.id, task_id, completed);
  revalidatePath("/todo");
};
