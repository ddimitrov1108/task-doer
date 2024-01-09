"use client";

import { IProject } from "@/lib/interfaces";
import { ReactNode, useContext, useEffect } from "react";
import { ProjectContext } from "../providers";

interface Props {
  project: IProject;
  children: ReactNode;
}
const ProjectWrapper = ({ project, children }: Props) => {
  const projectContext = useContext(ProjectContext);

  useEffect(() => {
    projectContext?.setProject(project);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
export default ProjectWrapper;
