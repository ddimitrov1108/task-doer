import cn from "@/lib/cn";

interface Props {
  className?: string;
}

const Skeleton = ({ className }: Props) => (
  <div className={cn(`animate-pulse bg-black-main`, className)}></div>
);
export default Skeleton;
