"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import { X } from "lucide-react";
import { Logo } from ".";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  containerClassName?: string;
  overlayClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const SideBar = ({
  open,
  setOpen,
  children,
  containerClassName,
  overlayClassName,
  headerClassName,
  bodyClassName,
}: Props) => {
  const onSideBarCloseHandler = () => setOpen(false);

  return (
    <div className="lg:hidden z-50 w-full h-full">
      <div
        onClick={onSideBarCloseHandler}
        className={cn(
          "z-50 transition-all fixed top-0 right-0 left-0 bottom-0 sm:backdrop-blur-sm sm:bg-containerBg/20",
          overlayClassName,
          open ? "block" : "hidden"
        )}
      ></div>

      <div
        className={cn(
          "z-50 fixed top-0 w-full h-full sm:w-1/2 transition-all ease-in-out duration-300 bg-bodyBg",
          open ? "left-0" : "-left-full",
          containerClassName
        )}
      >
        <div className="h-full overflow-auto styled-overflow">
          <div className="relative grid">
            <div
              className={cn(
                "flex items-center w-full justify-between",
                headerClassName
              )}
            >
              <Logo />

              <button
                tabIndex={0}
                type="button"
                className="grid items-center justify-center transition-all rounded-full outline-none text-gray-400 hover:text-slate-100 text-xl"
                onClick={onSideBarCloseHandler}
                title="Close navigation"
              >
                <X />
              </button>
            </div>

            <div className={bodyClassName}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
