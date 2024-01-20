"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const setTaskImportant = async (task_id: string, important: boolean) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (!isUUID(task_id)) throw new Error("Bad Request");
  if (typeof important != "boolean") throw new Error("Invalid fields");

  await taskController.setImportant(user.id, task_id, important);
  revalidatePath("/todo");
};
