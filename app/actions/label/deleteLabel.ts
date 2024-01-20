"use server";

import labelController from "@/db/LabelController";
import { getUserFromServerSession } from "@/lib/auth";
import { isUUID } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const deleteLabel = async (label_id: string) => {
  const user = await getUserFromServerSession();

  if (!user) throw new Error("Unauthenticated");
  if (!isUUID(label_id)) throw new Error("Bad Request");

  await labelController.delete(user.id, label_id);
  revalidatePath("/todo");
};
