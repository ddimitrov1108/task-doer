"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const TaskSearchForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

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

  return (
    <form onSubmit={(e: React.FormEvent) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Search task..."
        className="w-full md:max-w-[320px] bg-black-dark border outline-none p-2 rounded-lg border-black-light/20 focus:border-primary-main"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
          debounced(e.target.value);
        }}
      />
    </form>
  );
};
export default TaskSearchForm;
