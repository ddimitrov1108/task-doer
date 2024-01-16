import { NextRouteParams } from "@/lib/interfaces";

const ProjectPage = async ({ params }: NextRouteParams) => {
  return <div>{params?.id}</div>;
};
export default ProjectPage;
