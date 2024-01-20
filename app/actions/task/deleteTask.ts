"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const deleteTask = async (task_id: string) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (!isUUID(task_id)) throw new Error("Bad Request");

  await taskController.delete(user.id, task_id);
  revalidatePath("/todo");
};
