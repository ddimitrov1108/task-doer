"use server";

import labelController from "@/db/LabelController";
import { getUserFromServerSession } from "@/lib/auth";
import { LabelFormValues } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function updateLabel(
  label_id: string,
  values: LabelFormValues
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(label_id) || !values) return { error: "Bad Request" };
  if (!labelController.validate(values)) return { error: "Invalid fields" };

  try {
    const updatedLabel = await labelController.update(user.id, {
      id: label_id,
      name: values.name,
    });

    if (!updatedLabel) throw new Error("Failed to update label");

    revalidatePath("/todo/label/[id]", "page");

    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
