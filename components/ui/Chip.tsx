import cn from "@/lib/cn";

interface Props extends React.ComponentProps<"button"> {
  title: string;
  prepEndIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
}

const Chip = ({
  prepEndIcon,
  endIcon,
  className,
  title,
  ...restProps
}: Props) => {
  return (
    <div
      className={cn(
        "text-sm text-light transition-all flex items-center gap-1 min-w-fit max-w-fit whitespace-no-wrap py-0.5 px-1.5 border border-black-light/20 rounded-full",
        className
      )}
    >
      {prepEndIcon}
      {title}
      {endIcon}
    </div>
  );
};
export default Chip;
