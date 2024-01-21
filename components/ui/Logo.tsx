import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import Link from "next/link";

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2 text-xl font-semibold text-primary-main max-w-fit",
        className
      )}
    >
      <Bell className="text-3xl text-inherit group-hover:animate-[wiggle_1s_ease-in-out_infinite] transition-all" />
      TaskDoer
    </Link>
  );
};
export default Logo;
