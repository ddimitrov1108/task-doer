import cn from "@/lib/cn";

const Skeleton = ({ className, ...restProps }: React.ComponentProps<"div">) => (
  <div
    className={cn(`animate-pulse bg-black-main`, className)}
    {...restProps}
  ></div>
);
export default Skeleton;
