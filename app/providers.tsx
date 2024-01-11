"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          unstyled: true,
          duration: 3000,
          classNames: {
            error:
              "select-none w-full p-4 rounded-lg shadow-md flex gap-2 items-center bg-error-main text-white",
            success:
              "select-none w-full p-4 rounded-lg shadow-md flex gap-2 items-center bg-success-main text-white",
            warning:
              "select-none w-full p-4 rounded-lg shadow-md flex gap-2 items-center bg-warning-main text-black-dark",
            info: "select-none w-full p-4 rounded-lg shadow-md flex gap-2 items-center bg-primary-main text-white",
          },
        }}
      />
      {children}
    </SessionProvider>
  );
};
export default Providers;
