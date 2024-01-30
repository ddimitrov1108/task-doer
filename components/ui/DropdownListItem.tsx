import { INavLink } from "@/lib/interfaces";
import cn from "@/lib/cn";
import { Menu } from "@headlessui/react";
import Link from "next/link";

interface Props {
  as: React.ElementType | undefined;
  item: INavLink;
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler;
}

const DropdownListItem = ({
  as = Link,
  item,
  className,
  ...restProps
}: Props) => {
  return (
    <Menu.Item
      as={as}
      className={cn(
        "transition-all w-full px-2 py-1.5 rounded-lg flex items-center gap-2 hover:bg-black-light/10 text-light hover:text-white",
        className
      )}
      {...restProps}
    >
      {item.icon}
      {item.name}
    </Menu.Item>
  );
};
export default DropdownListItem;
