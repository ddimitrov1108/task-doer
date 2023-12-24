"use client";

import { NotistackProvider } from "@/components/providers";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <NotistackProvider>
      <SessionProvider>{children}</SessionProvider>
    </NotistackProvider>
  );
};
export default Providers;
