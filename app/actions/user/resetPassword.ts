"use server";

import userController from "@/db/UserController";
import { ResetPasswordEmailTemplate } from "@/components/email-temlates/ResetPasswordEmailTemplate";
import { ResetPasswordFormValues } from "@/lib/form-schemas";

export const resetPassword = async (values: ResetPasswordFormValues) => {
  if (!userController.validatePasswordReset(values))
    return { error: "Invalid form data" };

  const user = await userController.get(values.email);

  if (!user) return { error: "User with this email does not exist" };

  const resetPasswordToken = (await import("crypto"))
    .randomBytes(32)
    .toString("base64url");
  const today = new Date();
  const expiryDate = new Date(today.setDate(today.getDate() + 1));

  await userController.resetPasswordToken(
    user.id,
    resetPasswordToken,
    expiryDate
  );

  const { sendEmail } = await import("../email/sendEmail");

  try {
    await sendEmail({
      to: [values.email],
      subject: "Task-Doer: Reset your password",
      react: ResetPasswordEmailTemplate({
        email: values.email,
        resetPasswordToken,
      }) as React.ReactElement,
    });

    return {};
  } catch (e) {
    console.error(e);
    return { error: "Something went wrong. Please try again later" };
  }
};
