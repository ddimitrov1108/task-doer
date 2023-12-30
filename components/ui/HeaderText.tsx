interface Props {
  label?: string;
  title: string;
}

const HeaderText = ({ label = "", title = "Title" }: Props) => {
  return (
    <div className="w-full truncate ...">
      {label && (
        <h1 className="uppercase font-semibold text-primary-main text-sm">
          {label}
        </h1>
      )}
      <h1
        title={title}
        className="capitalize text-xl xs:text-2xl lg:text-3xl font-bold"
      >
        {title}
      </h1>
    </div>
  );
};

export default HeaderText;
