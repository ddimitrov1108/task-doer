"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  title?: string;
  hoverEffect?: boolean;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

const TextLink = ({
  href,
  title,
  hoverEffect = true,
  className,
  children,
  disabled = false,
}: Props) => {
  return (
    <Link
      href={href}
      title={title}
      className={cn("w-fit", className)}
      onClick={(e) => disabled && e.preventDefault()}
    >
      {children}
    </Link>
  );
};
export default TextLink;
