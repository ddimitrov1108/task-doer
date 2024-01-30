"use server";

import userController from "@/db/UserController";
import { ChangePasswordFormValues } from "@/lib/form-schemas";

export const changePasswordByToken = async (
  resetPasswordToken: string,
  values: ChangePasswordFormValues
) => {
  if (!userController.validateChangePassword(values))
    return { error: "Invalid email" };

  const user = await userController.getByToken(resetPasswordToken);

  if (!user) return { error: "User with this email does not exist" };

  const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
  const today = new Date();

  if (!resetPasswordTokenExpiry) return { error: "Token expired" };
  if (today > resetPasswordTokenExpiry) return { error: "Token expired" };

  try {
    await userController.resetPasswordByToken(user.id, values.password);
    return { error: "" };
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
