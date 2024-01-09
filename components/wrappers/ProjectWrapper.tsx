"use client";

import { IProject } from "@/lib/interfaces";
import { ReactNode, useContext, useEffect } from "react";
import { StorageContext } from "../providers";

interface Props {
  project: IProject;
  children: ReactNode;
}
const ProjectWrapper = ({ project, children }: Props) => {
  const storageContext = useContext(StorageContext);

  useEffect(() => {
    storageContext?.setProject(project);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return children;
};
export default ProjectWrapper;
