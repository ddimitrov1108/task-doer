"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  name: string;
  appendIcon: ReactNode;
  className?: string;
  onClick?: MouseEventHandler;
}

const NavLink = ({
  href = "/",
  name,
  appendIcon = <></>,
  className,
  ...restProps
}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-all w-full p-2 rounded-lg flex items-center justify-between gap-3",
        className,
        pathname === href
          ? "bg-black-light/10 text-white"
          : "text-main hover:text-white hover:bg-black-light/10"
      )}
      {...restProps}
    >
      <div className="flex items-center gap-3">
        {appendIcon}
        <span className="max-w-[200px] overflow-hidden truncate ...">
          {name}
        </span>
      </div>
    </Link>
  );
};

export default NavLink;
