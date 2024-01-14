import { FieldInputProps, FormikProps, FormikValues } from "formik";
import { Dispatch, SetStateAction } from "react";

export interface INextRouteParams {
  params: {
    id: string | null | undefined;
  };
}

export interface IUserData {
  id: string;
  name: string;
  email: string;
}

export interface IUserSession {
  user: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
  };
}

export interface IFormInput<T> {
  type: "text" | "email" | "password" | "date";
  label: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  field: FieldInputProps<T>;
  form: FormikProps<FormikValues>;
}

export interface IFormModal<T> {
  open: boolean;
  setOpen: (state: boolean) => void | Dispatch<SetStateAction<boolean>>;
  initialState?: T | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

export interface ISignInFormValues {
  email: string;
  password: string;
}

export interface ISignUpFormValues extends ISignInFormValues {
  first_name: string;
  last_name: string;
  confirmPassword: string;
}

export interface IProjectFormValues {
  name: string;
  color: string;
}

export interface ILabelFormValues {
  name: string;
}

export interface ITaskFormValues {
  name: string;
  description: string;
  completed: boolean;
  important: boolean;
  repeat: boolean;
  due_date: Date;
  labels?: {
    id: string;
    name: string;
  }[];
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
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  hash_password: string;
}

export interface INewUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IProject extends IProjectFormValues {
  id: string;
}

export interface ILabel extends ILabelFormValues {
  id: string;
}

export interface ITask extends ITaskFormValues {
  id: string;
}

export interface IProjectDetails extends IProject {
  tasks: ITask[];
}

export interface ILabelDetails extends ILabel {
  tasks: ITask[];
}
