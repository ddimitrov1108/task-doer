import { NextRouteParams } from "@/lib/interfaces";

const LabelPage = ({ params }: NextRouteParams) => {
  return <div>{params?.id}</div>;
};
export default LabelPage;
