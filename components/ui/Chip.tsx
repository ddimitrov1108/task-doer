import cn from "@/lib/cn";

interface Props extends React.ComponentProps<"div"> {
  prepEndIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
}

const Chip = ({
  prepEndIcon,
  appendIcon,
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
      {...restProps}
    >
      {prepEndIcon}
      {title}
      {appendIcon}
    </div>
  );
};
export default Chip;
