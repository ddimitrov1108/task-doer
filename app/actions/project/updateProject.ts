"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { ProjectFormValues } from "@/lib/interfaces/form-values";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function updateProject(
  projectId: string,
  values: ProjectFormValues
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(projectId) || !values) return { error: "Bad Request" };

  const projectController = (await import("@/db/ProjectController")).default;

  if (!projectController.validate(values))
    return { error: "Invalid form data" };

  try {
    await projectController.update(user.id, {
      id: projectId,
      name: values.name,
      color: values.color,
    });

    revalidatePath(`/todo/project/[id]`, "page");
    return { error: "" };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
