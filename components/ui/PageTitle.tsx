import cn from "@/lib/cn";

interface Props extends React.ComponentProps<"div"> {
  label?: string;
}

const PageTitle = ({ children, label = "", className, title }: Props) => {
  return (
    <div className="w-full">
      {label && (
        <label className="uppercase font-semibold text-primary-main text-sm">
          {label}
        </label>
      )}

      <div
        title={title}
        className={cn(
          "max-w-[288px] xxs:max-w-[340px] xs:max-w-[390px] sm:max-w-[600px] lg:max-w-[500px] xl:max-w-[380px] truncate ... text-light capitalize text-xl md:text-2xl font-bold",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};
export default PageTitle;
