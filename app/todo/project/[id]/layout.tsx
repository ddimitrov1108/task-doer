import ProjectProvider from "@/components/providers/ProjectProvider";
import { NextRouteParams } from "@/lib/interfaces";

interface Props extends NextRouteParams {
  children: React.ReactNode;
}

const ProjectLayout = async ({ children }: Props) => {
  return <ProjectProvider>{children}</ProjectProvider>;
};
export default ProjectLayout;
