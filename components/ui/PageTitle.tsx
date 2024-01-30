import cn from "@/lib/cn";

const PageTitle = ({
  children,
  label = "",
  className,
  title,
  ...restProps
}: React.ComponentProps<"div">) => {
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
          "max-w-[288px] xxs:max-w-[340px] xs:max-w-[390px] sm:max-w-[600px] lg:max-w-[500px] xl:max-w-[380px] 2xl: truncate ... text-light capitalize text-xl xs:text-2xl lg:text-3xl font-bold",
          className
        )}
        {...restProps}
      >
        {children}
      </div>
    </div>
  );
};
export default PageTitle;
