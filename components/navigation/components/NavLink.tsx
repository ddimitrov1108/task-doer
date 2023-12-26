"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler, ReactNode } from "react";

interface Props {
  href: string;
  text: string;
  appendIcon?: ReactNode;
  className?: string;
  title?: string;
  onClick?: MouseEventHandler;
}

const NavLink = ({
  href,
  text,
  appendIcon,
  className,
  ...restProps
}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-all w-full p-2 rounded-lg flex items-center gap-3",
        className,
        pathname === href
          ? "bg-black-light/10 text-white"
          : "text-light hover:text-white hover:bg-black-light/10"
      )}
      {...restProps}
    >
      {appendIcon}
      {text}
    </Link>
  );
};
export default NavLink;
