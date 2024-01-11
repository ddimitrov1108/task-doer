interface Props {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

const PageTitle = ({ children, label = "" }: Props) => {
  return (
    <>
      <div className="w-full truncate ...">
        {label && (
          <label className="uppercase font-semibold text-primary-main text-sm">
            {label}
          </label>
        )}

        <div className="capitalize text-xl xs:text-2xl lg:text-3xl font-bold">
          {children}
        </div>
      </div>
    </>
  );
};
export default PageTitle;
