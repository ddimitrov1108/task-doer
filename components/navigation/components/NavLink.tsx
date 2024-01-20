import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  href: string;
  text: string;
  count?: number;
  appendIcon?: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler;
}

const NavLink = ({
  href,
  text,
  count = 0,
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
        <div className="grid items-center max-w-[60px] rounded-full bg-primary-main/10 truncate ...">
          <span className="py-1 px-2 text-xs text-light">
            {count <= 10 ? count : "10+"}
          </span>
        </div>
      )}
    </Link>
  );
};
export default NavLink;
