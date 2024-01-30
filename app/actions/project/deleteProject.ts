"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function deleteProject(projectId: string) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(projectId)) return { error: "Bad Request" };

  try {
    await (
      await import("@/db/ProjectController")
    ).default.delete(user.id, projectId);

    revalidatePath("/todo");
    return { error: "" };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
