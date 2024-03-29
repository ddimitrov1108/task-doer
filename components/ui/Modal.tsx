"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "lucide-react";
import cn from "@/lib/cn";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const Modal = ({
  open,
  setOpen,
  modalTitle = "",
  children,
  className,
  headerClassName,
  bodyClassName,
}: Props) => {
  const onClickHandler = () => setOpen(false);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        open={open}
        onClose={onClickHandler}
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
                    "text-light flex items-center justify-between",
                    headerClassName
                  )}
                >
                  {modalTitle}

                  <button
                    type="button"
                    tabIndex={0}
                    onClick={onClickHandler}
                    className="text-main hover:text-light"
                  >
                    <X size={20} />
                  </button>
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
