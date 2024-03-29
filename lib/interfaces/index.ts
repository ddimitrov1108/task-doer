import { LabelFormValues, ProjectFormValues } from "./form-values";

export interface NextRouteParams {
  params: {
    id?: string;
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
  count: number[];
  projects: IProject[];
  labels: ILabel[];
}

export interface INavLink {
  id?: string;
  name: string;
  icon: JSX.Element;
  href?: string;
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
  dueDate: Date;
  important: boolean;
  completed: boolean;
  labels: {
    id: string;
    name: string;
  }[];
}
