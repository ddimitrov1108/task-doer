import cn from "@/lib/cn";

interface Props {
  className?: string;
}

const AtSign = ({ className }: Props) => {
  return <span className={cn("text-primary-main", className)}>@</span>;
};
export default AtSign;
