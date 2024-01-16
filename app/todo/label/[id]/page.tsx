import { NextRouteParams } from "@/lib/interfaces";

const LabelPage = async ({ params }: NextRouteParams) => {
  return <div>{params?.id}</div>;
};
export default LabelPage;
