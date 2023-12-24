import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}
const Skeleton = ({ className }: Props) => {
  return <div className={cn(`animate-pulse bg-black-main`, className)}></div>;
};
export default Skeleton;
