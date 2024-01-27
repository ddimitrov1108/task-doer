import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  href: string;
  text: string;
  count?: number;
  limitCount?: boolean;
  appendIcon?: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler;
}

const NavLink = ({
  href,
  text,
  count = 0,
  limitCount = false,
  appendIcon,
  className,
  ...restProps
}: Props) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-all w-full px-2 py-1.5 rounded-lg flex items-center gap-3",
        className,
        pathname === href
          ? "bg-primary-light/10 text-white"
          : "text-light hover:text-white hover:bg-black-light/10",
        count && "justify-between"
      )}
      {...restProps}
    >
      <div className="flex items-center gap-3">
        {appendIcon}
        {text}
      </div>

      {count > 0 && (
        <div className="grid items-center max-w-[60px] px-1 rounded-full text-primary-light/70">
          <span className="text-sm truncate ...">
            {!limitCount && count <= 10 ? count.toLocaleString() : "10+"}
          </span>
        </div>
      )}
    </Link>
  );
};
export default NavLink;
