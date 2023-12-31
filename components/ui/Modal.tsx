"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { IconButton } from ".";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  modalTitle?: ReactNode;
  children: ReactNode;
  showCloseBtn?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const Modal = ({
  isOpen,
  setIsOpen,
  modalTitle = "",
  children,
  showCloseBtn = true,
  className,
  headerClassName,
  bodyClassName,
}: Props) => {
  const onCloseClickHandler = () => {
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={isOpen}
        onClose={onCloseClickHandler}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black-dark/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  "bg-black-main w-full p-4 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded-lg",
                  className
                )}
              >
                <Dialog.Title
                  as="div"
                  className={cn(
                    "flex items-center justify-between",
                    headerClassName
                  )}
                >
                  {modalTitle}

                  {showCloseBtn && (
                    <IconButton
                      type="button"
                      tabIndex={0}
                      onClick={onCloseClickHandler}
                      className="text-xl"
                    >
                      <X />
                    </IconButton>
                  )}
                </Dialog.Title>
                <div className={cn("mt-1", bodyClassName)}>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Modal;
