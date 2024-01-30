"use server";

import { getUserFromServerSession } from "@/lib/auth";
import { LabelFormValues } from "@/lib/interfaces/form-values";
import { revalidatePath } from "next/cache";

export default async function createLabel(values: LabelFormValues) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!values) return { error: "Bad Request" };

  const labelController = (await import("@/db/LabelController")).default;

  if (!labelController.validate(values)) return { error: "Invalid form data" };

  try {
    await labelController.create(user.id, { name: values.name });
    revalidatePath("/todo");
    return { error: "" };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
