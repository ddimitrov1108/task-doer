"use client";

import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  title?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler;
}

const TextLink = ({ href, className, children, ...restProps }: Props) => {
  return (
    <Link href={href} className={cn("w-fit", className)} {...restProps}>
      {children}
    </Link>
  );
};
export default TextLink;
