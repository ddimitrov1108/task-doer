import { FieldInputProps, FormikProps, FormikValues } from "formik";
import { LabelFormValues, ProjectFormValues } from "./form-schemas";

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
  projects: Project[];
  labels: Label[];
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
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  field: FieldInputProps<T>;
  form: FormikProps<FormikValues>;
}

export interface Project extends ProjectFormValues {
  id: string;
}

export interface Label extends LabelFormValues {
  id: string;
}
