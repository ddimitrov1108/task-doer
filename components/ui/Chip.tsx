"use client";

import { cn } from "@/lib/utils";

interface Props {
  title: string;
  prepEndIcon?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Chip = ({ prepEndIcon, className, title, ...restProps }: Props) => {
  return (
    <button
      type="button"
      className={cn(
        "text-sm text-light transition-all flex items-center gap-1 min-w-fit whitespace-no-wrap py-0.5 px-1.5 border border-black-light/40 rounded-full",
        className
      )}
      {...restProps}
    >
      {prepEndIcon && (
        <span className="text-primary-main font-medium">{prepEndIcon}</span>
      )}
      {title}
    </button>
  );
};
export default Chip;
