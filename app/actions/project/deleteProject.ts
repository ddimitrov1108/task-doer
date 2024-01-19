"use server";

import projectController from "@/db/ProjectController";
import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const deleteProject = async (project_id: string) => {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(project_id)) return { error: "Bad Request" };

  try {
    await projectController.delete(user.id, project_id);
    revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
