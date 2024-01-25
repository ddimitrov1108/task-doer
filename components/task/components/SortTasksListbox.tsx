"use client";

import { cn } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownZA,
  ArrowUpAZ,
  ChevronDownIcon,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback } from "react";

const sortBy = [
  { name: "Ascending", value: "asc", icon: <ArrowUpAZ size={20} /> },
  { name: "Descending", value: "desc", icon: <ArrowDownZA size={20} /> },
  { name: "Newest", value: "newest", icon: <ArrowDown10 size={20} /> },
  { name: "Oldest", value: "oldest", icon: <ArrowDown01 size={20} /> },
];

const SortTasksListbox = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onChangeHandler = (value: { name: string; value: string }) => {
    router.push(`${pathname}?${createQueryString("sort", value.value)}`);
  };

  return (
    <Listbox
      defaultValue={
        sortBy.find((item) => item.value === searchParams.get("sort")) ||
        sortBy[2]
      }
      onChange={onChangeHandler}
    >
      <div className="relative select-none outline-none">
        <Listbox.Button
          className={({ open }) =>
            cn(
              "flex items-center gap-4 bg-black-main border border-black-light/20 cursor-pointer transition-all w-fit p-2 rounded-lg",
              open ? "border-primary-main" : "border-black-light/20"
            )
          }
        >
          {({ open }) => (
            <>
              <span className="text-light truncate">Sort By</span>
              <ChevronDownIcon
                size={20}
                className={cn("text-main transition-all", open && "rotate-180")}
              />
            </>
          )}
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="grid gap-1 rounded-lg min-w-fit absolute right-0 mt-2 w-full border border-black-light/20 bg-black-main p-2 overflow-hidden z-40 origin-top-right">
            {sortBy.map((sort, index) => (
              <Listbox.Option
                key={index}
                className={({ selected }) =>
                  cn(
                    "flex items-center gap-2 text-light transition-all w-full px-2 py-1.5 rounded-lg hover:bg-black-light/10 hover:text-white",
                    selected ? "bg-primary-light/10 text-white" : null
                  )
                }
                value={sort}
              >
                {sort.icon}
                <span className="block truncate">{sort.name}</span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
export default SortTasksListbox;
