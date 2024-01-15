import { INavLink } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { Menu } from "@headlessui/react";
import Link from "next/link";

interface Props {
  as: React.ElementType | undefined;
  item: INavLink;
  className?: string;
  iconClassName?: string;
  href?: string;
  onClick?: React.MouseEventHandler;
}

const DropdownListItem = ({
  as = Link,
  item,
  className,
  iconClassName,
  ...restProps
}: Props) => {
  return (
    <Menu.Item
      as={as}
      className={cn(
        "transition-all w-full p-2 rounded-lg flex items-center gap-2 hover:bg-black-light/10",
        className
      )}
      {...restProps}
    >
      <div className={cn("text-xl", iconClassName)}>{item.icon}</div>
      {item.name}
    </Menu.Item>
  );
};
export default DropdownListItem;
