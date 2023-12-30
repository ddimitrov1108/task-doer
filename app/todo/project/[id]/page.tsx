interface Props {
  params: { id?: number };
}

export const revalidate = 30;

const ProjectPage = async ({ params }: Props) => {
  return <div>{params.id}</div>;
};

export default ProjectPage;
