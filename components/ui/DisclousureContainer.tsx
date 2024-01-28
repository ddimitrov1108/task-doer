import { cn } from "@/lib/utils";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

interface Props {
  title: React.ReactNode;
  children: React.ReactNode;
  appendToTitle?: React.ReactNode;
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
    <div className={cn("outline-none select-none", className)}>
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
              <div className="flex items-center gap-2">
                {showChevron && (
                  <ChevronDown
                    size={20}
                    className={cn(
                      "z-0 transition-all text-main",
                      open && "rotate-180"
                    )}
                  />
                )}
                {title}
              </div>
              {appendToTitle}
            </Disclosure.Button>

            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Disclosure.Panel
                className={cn(
                  "transition-all duration-300 ease-in-out grid",
                  bodyClassName
                )}
              >
                {children}
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default DisclousureContainer;
