import ProjectProvider from "@/components/providers/ProjectProvider";

interface Props {
  children: React.ReactNode;
}

const ProjectLayout = async ({ children }: Props) => {
  return <ProjectProvider>{children}</ProjectProvider>;
};
export default ProjectLayout;
