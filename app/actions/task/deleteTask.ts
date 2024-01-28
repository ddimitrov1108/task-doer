"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function deleteTask(taskId: string) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(taskId)) return { error: "Bad Request" };

  console.log(taskId);

  try {
    const taskController = (await import("@/db/TaskController")).default;
    
    await taskController.delete(user.id, taskId);

    revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
