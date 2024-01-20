"use server";

import crypto from "crypto";
import { sendEmail } from "../email/sendEmail";
import userController from "@/db/UserController";
import { ResetPasswordEmailTemplate } from "@/components/email-temlates/ResetPasswordEmailTemplate";
import {
  ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/lib/form-schemas";

export const resetPassword = async (values: ResetPasswordFormValues) => {
  if (!resetPasswordSchema.safeParse(values).success)
    throw new Error("Invalid form data");

  const user = await userController.get(values.email);

  if (!user) throw new Error("User with this email does not exist");

  const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const expiryDate = new Date(today.setDate(today.getDate() + 1));

  await userController.resetPasswordToken(
    user.id,
    resetPasswordToken,
    expiryDate
  );

  await sendEmail({
    to: [values.email],
    subject: "Task-Doer: Reset your password",
    react: ResetPasswordEmailTemplate({
      email: values.email,
      resetPasswordToken,
    }) as React.ReactElement,
  });
};
