import LabelProvider from "@/components/providers/LabelProvider";
import TaskProvider from "@/components/providers/TaskProvider";

interface Props {
  children: React.ReactNode;
}

const LabelLayout = async ({ children }: Props) => {
  return (
    <LabelProvider>
      <TaskProvider>{children}</TaskProvider>
    </LabelProvider>
  );
};
export default LabelLayout;
