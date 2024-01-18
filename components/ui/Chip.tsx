import { cn } from "@/lib/utils";

interface Props extends React.ComponentProps<"button"> {
  title: string;
  prepEndIcon?: React.ReactNode;
  className?: string;
}

const Chip = ({ prepEndIcon, className, title, ...restProps }: Props) => {
  return (
    <button
      type="button"
      className={cn(
        "text-sm text-light transition-all flex items-center gap-1 min-w-fit whitespace-no-wrap py-0.5 px-1.5 border border-black-light/20 rounded-full",
        className
      )}
      {...restProps}
    >
      {prepEndIcon && (
        <span className="text-primary-main font-medium">{prepEndIcon}</span>
      )}
      {title}
    </button>
  );
};
export default Chip;
