interface Props {
  label?: string;
  children: React.ReactNode;
}

const PageHeader = ({ label = "", children }: Props) => {
  return (
    <div className="w-full truncate ...">
      {label && (
        <h1 className="uppercase font-semibold text-primary-main text-sm">
          {label}
        </h1>
      )}

      <div className="capitalize text-xl xs:text-2xl lg:text-3xl font-bold">
        {children}
      </div>
    </div>
  );
};
export default PageHeader;
