"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function setTaskCompleted(
  taskId: string,
  completed: boolean
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(taskId)) return { error: "Bad Request" };
  if (typeof completed != "boolean") return { error: "Invalid form data" };

  try {
    const taskController = (await import("@/db/TaskController")).default;

    await taskController.setCompleted(user.id, taskId, completed);

    revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
