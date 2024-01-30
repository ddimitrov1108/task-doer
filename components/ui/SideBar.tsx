"use client";

import { X } from "lucide-react";
import cn from "@/lib/cn";
import dynamic from "next/dynamic";

const Logo = dynamic(() => import("./Logo"), { loading: () => <span></span> });

interface Props {
  title?: React.ReactNode;
  showTitle?: boolean;
  showLogo?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  showFrom?: "left" | "right";
  className?: string;
  containerClassName?: string;
  overlayClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

const SideBar = ({
  title,
  showTitle = true,
  showLogo = true,
  open,
  setOpen,
  children,
  showFrom = "left",
  className,
  containerClassName,
  overlayClassName,
  headerClassName,
  bodyClassName,
}: Props) => {
  const onCloseClickHandler = () => setOpen(false);

  return (
    <div className={cn("z-50 w-full h-full", className)}>
      <div
        onClick={onCloseClickHandler}
        className={cn(
          "z-50 transition-all fixed top-0 right-0 left-0 bottom-0 sm:backdrop-blur-sm sm:bg-containerBg/20",
          overlayClassName,
          open ? "block" : "hidden"
        )}
      ></div>

      <div
        className={cn(
          "z-50 fixed top-0 w-full h-full sm:w-1/2 transition-all ease-in-out duration-300 bg-bodyBg",
          showFrom === "left" && (open ? "left-0" : "-left-full"),
          showFrom === "right" &&
            (open ? "right-0 translate-x-0" : "right-0 translate-x-full"),

          containerClassName
        )}
      >
        <div className="h-full overflow-auto styled-overflow">
          <div className="relative grid">
            <div
              className={cn(
                "flex items-center w-full",
                showTitle ? "justify-between" : "justify-end",
                headerClassName
              )}
            >
              {showTitle ? (title ? title : showLogo && <Logo />) : null}

              <button
                tabIndex={0}
                type="button"
                className="grid items-center justify-center transition-all rounded-full outline-none hover:text-light"
                onClick={onCloseClickHandler}
                title="Close navigation"
              >
                <X size={20} />
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
