import { FieldInputProps, FormikProps, FormikValues } from "formik";
import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";

export interface NextRouteParams {
  params: {
    id: string | null | undefined;
  };
}

export interface UserData {
  id: string;
  name: string;
  email: string;
}

export interface UserSession extends Session {
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface FormInput<T> {
  type: "text" | "email" | "password" | "date";
  label: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  field: FieldInputProps<T>;
  form: FormikProps<FormikValues>;
}

export interface FormModal<T> extends IForm<T> {
  open: boolean;
  setOpen: (state: boolean) => void | Dispatch<SetStateAction<boolean>>;
}

export interface IForm<T> {
  initialState?: T | undefined;
  editMode?: boolean;
  afterSubmit: () => void;
}

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues extends SignInFormValues {
  first_name: string;
  last_name: string;
  confirmPassword: string;
}

export interface ProjectFormValues {
  name: string;
  color: string;
}

export interface LabelFormValues {
  name: string;
}

export interface TaskFormValues {
  name: string;
  description: string;
  completed: boolean;
  important: boolean;
  due_date: Date;
  labels?: {
    id: string;
    name: string;
  }[];
}

export interface NavList {
  projects: Project[];
  labels: Label[];
}

export interface INavLink {
  id?: string;
  name: string;
  icon: JSX.Element;
  href?: string;
}

export interface Project extends ProjectFormValues {
  id: string;
}

export interface Label extends LabelFormValues {
  id: string;
}

export interface ITask extends TaskFormValues {
  id: string;
}

export interface ProjectDetails extends Project {
  tasks: ITask[];
}

export interface LabelDetails extends Label {
  tasks: ITask[];
}
