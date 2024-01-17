import LabelProvider from "@/components/providers/LabelProvider";
import { NextRouteParams } from "@/lib/interfaces";

interface Props extends NextRouteParams {
  children: React.ReactNode;
}

const LabelLayout = async ({ children, params }: Props) => {
  return <LabelProvider>{children}</LabelProvider>;
};
export default LabelLayout;
