"use server";

import projectController from "@/db/ProjectController";
import { getUserFromServerSession } from "@/lib/auth";
import { ProjectFormValues } from "@/lib/form-schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createProject = async (values: ProjectFormValues) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (!values) throw new Error("Bad Request");
  if (!projectController.validate(values)) throw new Error("Invalid fields");

  const project = await projectController.create(user.id, {
    name: values.name,
    color: values.color,
  });

  if (!project) throw new Error("Project failed to create");

  revalidatePath("/todo");
  redirect(`/todo/project/${project.id}`);
};
