"use client";

import { Dropdown, DropdownListItem } from "@/components/ui";
import { INavLink, IUserData } from "@/lib/interfaces";
import { LogOut, UserRound, UserRoundCog } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

interface Props {
  user: IUserData;
}

const dropdownLinks: INavLink[] = [
  {
    id: uuidv4(),
    name: "Settings",
    icon: <UserRoundCog size={20} />,
    href: "/account/settings",
  },
];

const UserDropdownMenu = ({ user }: Props) => {
  return (
    <Dropdown
      btnClassName="select-none w-full flex items-center gap-3 hover:bg-black-light/10"
      btn={
        <>
          <div className="text-2xl text-primary-main p-2 flex items-center bg-primary-light/10 rounded-full">
            <UserRound />
          </div>

          <div className="font-medium px-2 w-full grid text-left overflow-hidden">
            <span className="text-white truncate ...">{user.name}</span>
            <span className="text-sm text-main max-w-full truncate ...">
              {user.email}
            </span>
          </div>
        </>
      }
      chevronClassName="pr-0.5"
    >
      {dropdownLinks.map((link) => (
        <DropdownListItem
          key={link.id}
          as={Link}
          href={link.href}
          item={link}
          className="text-light hover:text-white"
          iconClassName="text-primary-main"
        />
      ))}

      <DropdownListItem
        as="button"
        onClick={() => signOut()}
        className="text-error-main"
        item={{
          name: "Sign Out",
          icon: <LogOut size={20} />,
        }}
      />
    </Dropdown>
  );
};
export default UserDropdownMenu;
