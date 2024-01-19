import LabelProvider from "@/components/providers/LabelProvider";

interface Props {
  children: React.ReactNode;
}

const LabelLayout = async ({ children }: Props) => {
  return <LabelProvider>{children}</LabelProvider>;
};
export default LabelLayout;
