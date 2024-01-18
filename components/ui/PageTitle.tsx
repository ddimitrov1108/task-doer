import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  label?: string;
}

const PageTitle = ({ children, label = "", className }: Props) => {
  return (
    <>
      <div className="w-full truncate ...">
        {label && (
          <label className="uppercase font-semibold text-primary-main text-sm">
            {label}
          </label>
        )}

        <div className={cn("capitalize text-xl xs:text-2xl lg:text-3xl font-bold", className)}>
          {children}
        </div>
      </div>
    </>
  );
};
export default PageTitle;
