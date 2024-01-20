"use server";

import projectController from "@/db/ProjectController";
import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const deleteProject = async (project_id: string) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (!isUUID(project_id)) throw new Error("Bad Request");

  await projectController.delete(user.id, project_id);
  revalidatePath("/todo");
};
