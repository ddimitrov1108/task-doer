interface Props extends React.ComponentProps<"div"> {
  title: string;
  description: string;
}

const Title = ({ title, description, ...restProps }: Props) => {
  return (
    <div className="grid gap-1 mb-8" {...restProps}>
      <h1 className="text-3xl xl:text-4xl font-semibold text-light">{title}</h1>
      <p>{description}</p>
    </div>
  );
};
export default Title;
