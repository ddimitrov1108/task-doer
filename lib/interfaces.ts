import { FieldInputProps, FormikProps, FormikValues } from "formik";
import { Dispatch, SetStateAction } from "react";

export interface IUserData {
  id?: string | null;
  name?: string | null;
  email?: string | null;
}

export interface IUserSession {
  user: IUserData;
}

export interface IFormInput<T> {
  type: "text" | "email" | "password";
  label: string;
  subLabel?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  field: FieldInputProps<T>;
  form: FormikProps<FormikValues>;
}

export interface IFormModal<T> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialState?: T | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

export interface ISignInFormValues {
  email: string;
  password: string;
}

export interface ISignUpFormValues extends ISignInFormValues {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export interface IProjectFormValues {
  name: string;
  color: string;
}

export interface ILabelFormValues {
  name: string;
}

export interface IValidateProjectValues {
  name: string | null | undefined;
  color: string | null | undefined;
}

export interface IValidateLabelValues {
  name: string | null | undefined;
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

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hashPassword: string;
}

export interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IProject extends IProjectFormValues {
  id: number;
}

export interface ILabel extends ILabelFormValues {
  id: number;
}

export interface ITask {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  important: boolean;
  dueDate: Date;
  labels?: {
    id: number;
    name: string;
  }[];
}
