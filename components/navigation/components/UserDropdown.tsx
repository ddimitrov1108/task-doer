"use client";

import { IUserData } from "@/lib/interfaces";
import { LogOut, UserRound, UserRoundCog } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Dropdown from "@/components/ui/Dropdown";
import DropdownListItem from "@/components/ui/DropdownListItem";

const userLinks = [
  {
    id: uuidv4(),
    name: "Settings",
    icon: <UserRoundCog size={20} />,
    href: "/account/settings",
  },
];

interface Props {
  user: IUserData;
}

const UserDropdown = ({ user }: Props) => {
  const onSignOutClickHandler = () => signOut();

  return (
    <Dropdown
      buttonClassName="select-none w-full flex items-center gap-3 hover:bg-black-light/10"
      buttonContent={
        <>
          <div className="text-2xl text-primary-main p-2 flex items-center bg-primary-light/10 rounded-full">
            <UserRound size={20} />
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
      {userLinks.map((link) => (
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
        onClick={onSignOutClickHandler}
        className="text-error-main"
        item={{
          name: "Sign Out",
          icon: <LogOut size={20} />,
        }}
      />
    </Dropdown>
  );
};
export default UserDropdown;
