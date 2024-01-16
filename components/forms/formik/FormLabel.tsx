import { cn } from "@/lib/utils";

type Props = {
  label: string;
  htmlFor?: string;
  className?: string;
};

const FormLabel = ({ label, htmlFor, className }: Props) => {
  return (
    <div className={cn("font-medium text-sm text-light min-w-fit", className)}>
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  );
};
export default FormLabel;
