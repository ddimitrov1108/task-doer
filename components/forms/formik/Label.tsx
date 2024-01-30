import cn from "@/lib/cn";

interface Props extends React.ComponentProps<"label"> {
  text: string;
}

const Label = ({ text, className, ...restProps }: Props) => {
  return (
    <div className={cn("font-medium text-sm text-light w-fit", className)}>
      <label {...restProps}>{text}</label>
    </div>
  );
};
export default Label;
