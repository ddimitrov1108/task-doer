"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { ProjectFormValues } from "@/lib/form-schemas";
import { revalidatePath } from "next/cache";

export default async function createProject(values: ProjectFormValues) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!values) return { error: "Bad Request" };

  const projectController = (await import("@/db/ProjectController")).default;

  if (!projectController.validate(values))
    return { error: "Invalid form data" };

  try {
    const project = await projectController.create(user.id, {
      name: values.name,
      color: values.color,
    });

    if (!project) throw new Error("Project failed to create");

    revalidatePath("/todo");
    return { href: `/todo/project/${project.id}`, error: "" };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
