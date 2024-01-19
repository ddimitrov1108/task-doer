"use server";

import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function setTaskImportant(
  task_id: string,
  important: boolean
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(task_id)) return { error: "Bad Request" };
  if (typeof important != "boolean") return { error: "Invalid fields" };

  try {
    const task = await taskController.setImportant(user.id, task_id, important);

    if (!task) throw new Error("Failed to update completed status");

    revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
