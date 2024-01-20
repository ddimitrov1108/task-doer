"use server";

import userController from "@/db/UserController";
import { ChangePasswordFormValues } from "@/lib/form-schemas";

export const changePasswordByToken = async (
  reset_password_token: string,
  values: ChangePasswordFormValues
) => {
  const user = await userController.getByToken(reset_password_token);

  if (!user) throw new Error("User with this email does not exist");

  const resetPasswordTokenExpiry = user.reset_password_token_expiry;
  const today = new Date();

  if (!resetPasswordTokenExpiry) throw new Error("Token expired");
  if (today > resetPasswordTokenExpiry) throw new Error("Token expired");

  await userController.resetPasswordByToken(user.id, values.password);
};
