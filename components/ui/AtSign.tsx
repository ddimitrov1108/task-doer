import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const AtSign = ({ className }: Props) => {
  return <span className={cn("text-primary-main", className)}>@</span>;
};
export default AtSign;
