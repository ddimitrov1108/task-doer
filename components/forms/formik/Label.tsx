import { cn } from "@/lib/utils";

interface Props {
  label: string;
  subLabel?: string;
  htmlFor?: string;
  className?: string;
}

const Label = ({ label, subLabel, htmlFor, className }: Props) => {
  return (
    <div className={cn("text-sm text-[#C7C9D9] min-w-fit", className)}>
      <label htmlFor={htmlFor}>{label}</label>

      {subLabel && <p className="min-w-fit">{subLabel}</p>}
    </div>
  );
};
export default Label;
