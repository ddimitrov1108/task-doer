import { cn } from "@/lib/utils";

interface Props {
  text: string;
  htmlFor?: string;
  className?: string;
}

const Label = ({ text, htmlFor, className }: Props) => {
  return (
    <div className={cn("font-medium text-sm text-light min-w-fit", className)}>
      <label htmlFor={htmlFor}>{text}</label>
    </div>
  );
};
export default Label;
