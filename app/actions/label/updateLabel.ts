"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { LabelFormValues, labelFormSchema } from "@/lib/form-schemas";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function updateLabel(
  labelId: string,
  values: LabelFormValues
) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(labelId) || !values) return { error: "Bad Request" };
  if (!labelFormSchema.safeParse(values).success)
    return { error: "Invalid form data" };

  try {
    const labelController = (await import("@/db/LabelController")).default;

    await labelController.update(user.id, {
      id: labelId,
      name: values.name,
    });

    revalidatePath(`/todo/label/[id]`, "page");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
