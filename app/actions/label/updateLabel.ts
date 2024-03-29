"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { LabelFormValues } from "@/lib/interfaces/form-values";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function updateLabel(
  labelId: string,
  values: LabelFormValues
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(labelId) || !values) return { error: "Bad Request" };

  const labelController = (await import("@/db/LabelController")).default;

  if (!labelController.validate(values)) return { error: "Invalid form data" };

  try {
    await labelController.update(user.id, {
      id: labelId,
      name: values.name,
    });

    revalidatePath(`/todo/label/[id]`, "page");
    return { error: "" };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
