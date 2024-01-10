"use server";

import { projectController } from "@/db";
import { getUserFromServerSession } from "@/lib/auth";
import { IProjectFormValues } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";

export default async function createProject(values: IProjectFormValues) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!values) return { error: "Invalid fields" };

  const isFormDataValid = projectController.validate(values);

  if (!isFormDataValid) return { error: "Invalid fields" };

  try {
    const project = await projectController.create(user.id, {
      name: values.name,
      color: values.color,
    });

    if (!project) throw new Error("Project failed to create");

    revalidatePath("/todo");

    return { href: `/todo/project/${project.id}` };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
