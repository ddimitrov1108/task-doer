import { z } from "zod";

const nameRegex = /^[\p{L}\p{S}\s'-]{2,20}$/iu;
const emailRegex = /^[a-zA-Z0-9._%+-]{4,60}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
const sectionNameRegex = /^[\p{P}\p{S}\p{L}\s-][\p{L}\d\s-]{3,30}$/u;
const descriptionRegex = /^[\p{L}\p{N}\p{P}\s]{0,255}$/u;
const hexColorRegex = /^#?([0-9a-fA-F]{3}){1,2}$/i;

export const signInFormSchema = z.object({
  email: z
    .string({ required_error: "Field is required" })
    .email("Invalid field")
    .max(60, "Maximum length of 60 symbols is exceeded")
    .regex(emailRegex),
  password: z
    .string({ required_error: "Field is required" })
    .min(
      8,
      "Required minimum 8 symbol, from which one must be a number and special symbol"
    )
    .max(20, "Maximum length of 20 symbols is exceeded")
    .regex(
      passwordRegex,
      "Required minimum 8 symbol, from which one must be a number and special symbol"
    ),
});

export const signUpFormSchema = z.object({
  first_name: z
    .string({ required_error: "Field is required" })
    .min(2, "Minimum length of 2 symbols is required")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .regex(nameRegex, "Invalid field"),
  last_name: z
    .string({ required_error: "Field is required" })
    .min(2, "Minimum length of 2 symbols is required")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .regex(nameRegex, "Invalid field"),
  email: z
    .string({ required_error: "Field is required" })
    .email("Invalid field")
    .max(60, "Maximum length of 60 symbols is exceeded")
    .regex(emailRegex),
  password: z
    .string({ required_error: "Field is required" })
    .min(8, "Minimum length of 8 symbols is required")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .regex(
      passwordRegex,
      "Required minimum 8 symbol, from which one must be a number and special symbol"
    ),
  confirmPassword: z
    .string({ required_error: "Field is required" })
    .min(8, "Minimum length of 8 symbols is required")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .regex(
      passwordRegex,
      "Required minimum 8 symbol, from which one must be a number and special symbol"
    ),
});

export const projectFormSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .min(2, "Minimum length of 2 symbols is required")
    .max(30, "Maximum length of 40 symbols is exceeded")
    .regex(sectionNameRegex, "Invalid field"),
  color: z
    .string({ required_error: "Field is required" })
    .min(7, "Minimum length of 7 symbols is exceeded")
    .max(9, "Maximum length of 9 symbols is exceeded")
    .regex(hexColorRegex, "Invalid hex color value"),
});

export const labelFormSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .min(2, "Minimum length of 2 symbols is required")
    .max(30, "Maximum length of 40 symbols is exceeded")
    .regex(sectionNameRegex, "Invalid field"),
});

export const taskFormSchema = z.object({
  name: z
    .string({ required_error: "Field is required" })
    .min(2, "Minimum length of 2 symbols is required")
    .max(30, "Maximum length of 40 symbols is exceeded")
    .regex(sectionNameRegex, "Invalid field"),
  description: z
    .string({ required_error: "Field is required" })
    .max(255, "Maximum length of 255 symbols is exceeded")
    .regex(descriptionRegex, "Invalid field")
    .nullable(),
  due_date: z.date({ required_error: "Field is required" }),
  important: z.boolean().default(false),
  labels: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .default([])
    .nullable(),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
export type ProjectFormValues = z.infer<typeof projectFormSchema>;
export type LabelFormValues = z.infer<typeof labelFormSchema>;
export type TaskFormValues = z.infer<typeof taskFormSchema>;
export const FormErrors = z.ZodError;
