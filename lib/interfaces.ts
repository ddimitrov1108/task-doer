import { FieldInputProps, FormikProps, FormikValues } from "formik";
import {
  LabelFormValues,
  ProjectFormValues,
} from "./form-schemas";

export interface NextRouteParams {
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
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
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

export interface IFormModal<T> extends IForm<T> {
  open: boolean;
  setOpen: (
    state: boolean
  ) => void | React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IForm<T> {
  initialState?: T | undefined;
  editMode?: boolean;
  afterSubmit: () => void;
}

export interface IFormInput<T> {
  type: "text" | "email" | "password" | "date";
  label: string;
  containerClassName?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  field: FieldInputProps<T>;
  form: FormikProps<FormikValues>;
}

export interface IProject extends ProjectFormValues {
  id: string;
}

export interface ILabel extends LabelFormValues {
  id: string;
}

export interface ITask {
  id: string;
  name: string;
  description: string | null;
  due_date: Date;
  important: boolean;
  completed: boolean;
  labels: {
    name: string;
    id: string;
  }[];
}
