"use client";

import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const NotistackProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      preventDuplicate
      dense
    >
      {children}
    </SnackbarProvider>
  );
};
export default NotistackProvider;
