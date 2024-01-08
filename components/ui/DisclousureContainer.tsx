"use client";

import { cn } from "@/lib/utils";
import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  title: ReactNode;
  children: ReactNode;
  appendToTitle?: ReactNode;
  className?: string;
  btnClassName?: string;
  bodyClassName?: string;
  showChevron?: boolean;
  open?: boolean;
}

const DisclousureContainer = ({
  title,
  children,
  appendToTitle,
  className,
  btnClassName,
  bodyClassName,
  showChevron = true,
  open = false,
  ...restProps
}: Props) => {
  return (
    <div className={cn("select-none", className)}>
      <Disclosure {...restProps} defaultOpen={open}>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className={cn(
                "text-main hover:text-light cursor-pointer group flex items-center font-medium transition-all",
                btnClassName
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "z-0 transition-all text-main text-xl",
                    open && "rotate-180"
                  )}
                >
                  {showChevron && <ChevronDown size={20} />}
                </div>
                {title}
              </div>
              {appendToTitle}
            </Disclosure.Button>

            <Disclosure.Panel
              className={cn("grid text-black transition-all", bodyClassName)}
            >
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default DisclousureContainer;
