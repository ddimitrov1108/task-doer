import { NextRouteParams } from "@/lib/interfaces";

const ProjectPage = ({ params }: NextRouteParams) => {
  return <>{params?.id}</>;
};
export default ProjectPage;
