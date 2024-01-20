"use server";

import labelController from "@/db/LabelController";
import { getUserFromServerSession } from "@/lib/auth";
import { LabelFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const updateLabel = async (
  label_id: string,
  values: LabelFormValues
) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (!isUUID(label_id) || !values) throw new Error("Bad Request");
  if (!labelController.validate(values)) throw new Error("Invalid fields");

  await labelController.update(user.id, {
    id: label_id,
    name: values.name,
  });

  revalidatePath(`/todo/label/[id]`, "page");
};
