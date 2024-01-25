"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function setTaskImportant(
  taskId: string,
  important: boolean
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(taskId)) return { error: "Bad Request" };
  if (typeof important != "boolean") return { error: "Invalid form data" };

  try {
    const taskController = (await import("@/db/TaskController")).default;
    
    await taskController.setImportant(user.id, taskId, important);

    revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
