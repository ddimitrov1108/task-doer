"use server";

import { labelController } from "@/db";
import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export default async function deleteLabel(label_id: string) {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!isUUID(label_id)) return { error: "Bad Request" };

  try {
    const deletedLabel = await labelController.delete(user.id, label_id);

    if (!deletedLabel) throw new Error("Failed to delete label");

    revalidatePath("/todo/label/[id]", "page");

    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
}
