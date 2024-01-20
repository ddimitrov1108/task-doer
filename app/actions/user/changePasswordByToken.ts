"use server";

import userController from "@/db/UserController";
import { ChangePasswordFormValues } from "@/lib/form-schemas";

export const changePasswordByToken = async (
  reset_password_token: string,
  values: ChangePasswordFormValues
) => {
  const user = await userController.getByToken(reset_password_token);

  if (!user) return { error: "User with this email does not exist" };

  const resetPasswordTokenExpiry = user.reset_password_token_expiry;
  const today = new Date();

  if (!resetPasswordTokenExpiry) return { error: "Token expired" };
  if (today > resetPasswordTokenExpiry) return { error: "Token expired" };
  
  try {
    await userController.resetPasswordByToken(user.id, values.password);
    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
