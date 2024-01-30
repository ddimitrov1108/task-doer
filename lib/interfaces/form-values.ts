import { z } from "zod";
import {
  changePasswordSchema,
  labelFormSchema,
  projectFormSchema,
  resetPasswordSchema,
  signInFormSchema,
  signUpFormSchema,
  taskFormSchema,
} from "./form-schemas";

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type SignInFormValues = z.infer<typeof signInFormSchema>;
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type LabelFormValues = z.infer<typeof labelFormSchema>;
export type TaskFormValues = z.infer<typeof taskFormSchema>;
export const FormErrors = z.ZodError;
