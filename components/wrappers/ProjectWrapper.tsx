"use client";

import { IProject } from "@/lib/interfaces";
import { ReactNode, useContext, useEffect } from "react";
import { StorageContext } from "../providers";

interface Props {
  value: IProject;
  children: ReactNode;
}

const ProjectWrapper = ({ value, children }: Props) => {
  const storageContext = useContext(StorageContext);

  useEffect(() => {
    storageContext?.setProject(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return children;
};
export default ProjectWrapper;
