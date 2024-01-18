import ProjectProvider from "@/components/providers/ProjectProvider";
import TaskProvider from "@/components/providers/TaskProvider";

interface Props {
  children: React.ReactNode;
}

const ProjectLayout = async ({ children }: Props) => {
  return (
    <ProjectProvider>
      <TaskProvider>{children}</TaskProvider>
    </ProjectProvider>
  );
};
export default ProjectLayout;
