import { INextRouteParams } from "@/lib/interfaces";

export const revalidate = 30;

const LabelPage = async ({ params }: INextRouteParams) => {
  return <div>{params.id}</div>;
};

export default LabelPage;
