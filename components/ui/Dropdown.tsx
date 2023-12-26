"use client";

import { cn } from "@/lib/utils";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Fragment, ReactNode } from "react";

interface Props {
  btn: ReactNode;
  className?: string;
  btnClassName?: string;
  menuItemsClassName?: string;
  chevronClassName?: string;
  showChevron?: boolean;
  children: ReactNode;
}

const Dropdown = ({
  btn,
  className,
  btnClassName,
  menuItemsClassName,
  chevronClassName,
  showChevron = true,
  children,
  ...restProps
}: Props) => {
  return (
    <Menu as="div" className={cn("", className)} {...restProps}>
      <Menu.Button
        as="div"
        className={cn(
          "cursor-pointer transition-all w-fit p-2 rounded-lg",
          btnClassName
        )}
        onMouseUp={(e) => e.stopPropagation()}
      >
        {({ open }) => (
          <>
            {btn}
            {showChevron && (
              <div
                className={cn(
                  "text-xl text-main transition-all",
                  open && "rotate-180",
                  chevronClassName
                )}
              >
                <ChevronDown />
              </div>
            )}
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="relative">
          <Menu.Items
            className={cn(
              "border border-black-light/40 bg-black-main p-2 overflow-hidden z-40 absolute right-0 mt-2 w-56 origin-top-right rounded-lg shadow-xl focus:outline-none outline-none select-none",
              menuItemsClassName
            )}
          >
            {children}
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
};
export default Dropdown;
