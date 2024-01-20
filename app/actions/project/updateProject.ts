"use server";

import projectController from "@/db/ProjectController";
import { getUserFromServerSession } from "@/lib/auth";
import { ProjectFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const updateProject = async (
  project_id: string,
  values: ProjectFormValues
) => {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(project_id) || !values) return { error: "Bad Request" };
  if (!projectController.validate(values)) return { error: "Invalid fields" };

  try {
    await projectController.update(user.id, {
      id: project_id,
      name: values.name,
      color: values.color,
    });

    revalidatePath(`/todo/project/[id]`, "page");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
