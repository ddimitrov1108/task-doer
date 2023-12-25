import { ILabel } from "@/db/label";
import { IProject } from "@/db/project";
import { FieldInputProps, FormikProps, FormikValues } from "formik";
import { DefaultSession } from "next-auth";

export interface InputProps<T> {
  type: "text" | "email" | "password";
  label: string;
  subLabel?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  field: FieldInputProps<T>;
  form: FormikProps<FormikValues>;
}

export interface ISignInValues {
  email: string;
  password: string;
}

export interface ISignUpValues extends ISignInValues {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface IUserData {
  id?: number | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface IUserSession extends DefaultSession {
  user: IUserData;
}

export interface INavList {
  projects: IProject[];
  labels: ILabel[];
}

export interface INavLink {
  id?: string;
  name: string;
  icon: JSX.Element;
  href?: string;
}
