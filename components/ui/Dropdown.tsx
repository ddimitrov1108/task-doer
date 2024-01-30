import cn from "@/lib/cn";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import { Fragment } from "react";

interface Props {
  buttonContent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  buttonEvents?: React.MouseEventHandler[];
  bodyClassName?: string;
  chevronClassName?: string;
  showChevron?: boolean;
}

const Dropdown = ({
  buttonContent,
  className,
  buttonClassName,
  bodyClassName,
  chevronClassName,
  showChevron = true,
  children,
  buttonEvents,
  ...restProps
}: Props) => {
  return (
    <Menu as="div" className={className} {...restProps}>
      <Menu.Button
        as="div"
        className={cn(
          "cursor-pointer transition-all w-fit p-2 rounded-lg",
          buttonClassName
        )}
        {...buttonEvents}
      >
        {({ open }) => (
          <>
            {buttonContent}
            {showChevron && (
              <div
                className={cn(
                  " text-main transition-all",
                  open && "rotate-180",
                  chevronClassName
                )}
              >
                <ChevronDownIcon size={20} />
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
              "grid gap-1 border border-black-light/20 bg-black-main p-2 overflow-hidden z-40 absolute right-0 mt-2 w-56 origin-top-right rounded-lg shadow-lg focus:outline-none outline-none select-none",
              bodyClassName
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
