"use server";

import labelController from "@/db/LabelController";
import { getUserFromServerSession } from "@/lib/auth";
import { ILabelFormValues } from "@/lib/interfaces";
import { revalidatePath } from "next/cache";

export const createLabel = async (values: ILabelFormValues) => {
  const user = await getUserFromServerSession();

  if (!user) return { error: "Unauthenticated" };
  if (!values) return { error: "Invalid fields" };

  const isFormDataValid = labelController.validate(values);

  if (!isFormDataValid) return { error: "Invalid fields" };

  try {
    const label = await labelController.create(user.id, {
      name: values.name,
    });

    if (!label) throw new Error("Label failed to create");

    revalidatePath("/todo");
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
