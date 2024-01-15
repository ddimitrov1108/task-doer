import Skeleton from "@/components/ui/Skeleton";

const loading = () => {
  return (
    <>
      <div className="w-full mb-10 grid gap-4 md:flex md:items-end md:justify-between">
        <div className="w-full flex gap-3 items-center">
          <Skeleton className="rounded-full w-[16px] h-[16px]" />
          <Skeleton className="rounded-lg w-1/2 h-8" />
        </div>

        <div className="min-w-full md:min-w-fit flex items-center justify-between gap-2">
          <Skeleton className="rounded-lg w-24 h-6" />
          <Skeleton className="rounded-full w-[32px] h-[32px]" />
        </div>
      </div>

      <div className="grid gap-10">
        <div className="grid gap-5">
          <Skeleton className="rounded-lg w-1/6 h-4" />

          <div className="grid gap-2">
            <Skeleton className="rounded-lg w-[70%] h-8" />
            <Skeleton className="rounded-lg w-[90%] h-8" />
            <Skeleton className="rounded-lg w-[80%] h-8" />
          </div>
        </div>

        <div className="grid gap-5">
          <Skeleton className="rounded-lg w-1/5 h-4" />

          <div className="grid gap-2">
            <Skeleton className="rounded-lg w-[90%] h-8" />
            <Skeleton className="rounded-lg w-[70%] h-8" />
            <Skeleton className="rounded-lg w-[80%] h-8" />
          </div>
        </div>

        <div className="grid gap-5">
          <Skeleton className="rounded-lg w-1/5 h-4" />

          <div className="grid gap-2">
            <Skeleton className="rounded-lg w-[70%] h-8" />
            <Skeleton className="rounded-lg w-[80%] h-8" />
          </div>
        </div>
      </div>
    </>
  );
};
export default loading;
