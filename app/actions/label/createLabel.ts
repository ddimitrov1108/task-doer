"use server";

import labelController from "@/db/LabelController";
import { getUserFromServerSession } from "@/lib/auth";
import { LabelFormValues } from "@/lib/form-schemas";
import { revalidatePath } from "next/cache";

export const createLabel = async (values: LabelFormValues) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (!values) throw new Error("Bad Request");
  if (!labelController.validate(values)) throw new Error("Invalid fields");

  await labelController.create(user.id, { name: values.name });
  revalidatePath("/todo");
};
