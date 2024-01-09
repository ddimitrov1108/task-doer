"use client";

import { ILabel, IProject, ITask } from "@/lib/interfaces";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

export const StorageContext = createContext<{
  project: IProject | undefined;
  label: ILabel | undefined;
  task: ITask | undefined;
  setProject: Dispatch<SetStateAction<IProject | undefined>>;
  setLabel: Dispatch<SetStateAction<ILabel | undefined>>;
  setTask: Dispatch<SetStateAction<ITask | undefined>>;
} | null>(null);

const StorageProvider = ({ children }: Props) => {
  const [project, setProject] = useState<IProject>();
  const [label, setLabel] = useState<ILabel>();
  const [task, setTask] = useState<ITask>();

  return (
    <StorageContext.Provider
      value={{ project, label, task, setProject, setLabel, setTask }}
    >
      {children}
    </StorageContext.Provider>
  );
};
export default StorageProvider;
