interface Props {
  title: string;
  description: string;
}

const Title = ({ title, description }: Props) => {
  return (
    <div className="grid gap-1 mb-8">
      <h1 className="text-3xl xl:text-4xl font-semibold text-white">{title}</h1>
      <p>{description}</p>
    </div>
  );
};
export default Title;
