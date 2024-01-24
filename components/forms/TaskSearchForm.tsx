"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

const TaskSearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const debounced = useDebouncedCallback((value: string) => {
    router.push(`${pathname}?${createQueryString("search", value)}`);
  }, 1000);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value);
  };

  return (
    <form onSubmit={(e: React.FormEvent) => e.preventDefault()} className="w-full">
      <div className="transition-all group md:max-w-[360px] py-2 px-4 flex items-center gap-2 bg-black-dark border border-black-light/20 focus-within:border-primary-main rounded-lg outline-none">
        <Search size={20} className="group-focus-within:text-primary-main" />

        <input
          type="text"
          placeholder="Search task..."
          className="w-full bg-black-dark outline-none"
          defaultValue={searchParams.get("search") || ""}
          onChange={onChangeHandler}
          maxLength={30}
        />
      </div>
    </form>
  );
};
export default TaskSearchForm;
