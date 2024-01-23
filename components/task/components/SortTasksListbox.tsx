"use client";

import { cn } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment, useCallback, useState } from "react";

const sortBy = [
  { name: "A-Z", value: "asc" },
  { name: "Z-A", value: "desc" },
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
];

const SortTasksListbox = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState(
    sortBy.find((item) => item.value === searchParams.get("sort")) || sortBy[2]
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onChangeHandler = (value: { name: string; value: string }) => {
    setSelected(value);
    router.push(`${pathname}?${createQueryString("sort", value.value)}`);
  };

  return (
    <Listbox value={selected} onChange={onChangeHandler}>
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
              <span className="text-light truncate">{selected.name}</span>
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
          <Listbox.Options className="rounded-lg min-w-fit absolute right-0 mt-2 w-full border border-black-light/20 bg-black-main p-2 overflow-hidden z-40 origin-top-right">
            {sortBy.map((sort, index) => (
              <Listbox.Option
                key={index}
                className={({ active, selected }) =>
                  cn(
                    "flex items-center gap-2 text-light transition-all w-full p-2 rounded-lg hover:bg-black-light/10",
                    active ? "" : "",
                    selected
                      ? "justify-between"
                      : "justify-end"
                  )
                }
                value={sort}
              >
                {({ selected }) => (
                  <>
                    {selected ? (
                      <Check size={20} className="text-primary-main" />
                    ) : null}

                    <span className="block truncate">{sort.name}</span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
export default SortTasksListbox;
