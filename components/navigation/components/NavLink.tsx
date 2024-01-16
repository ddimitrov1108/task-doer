import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  href: string;
  text: string;
  appendIcon?: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler;
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