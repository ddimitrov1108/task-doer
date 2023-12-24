"use client";

import { useEffect, useState } from "react";

type StateReturnType = {
  open: boolean;
  setOpenState: (state: boolean) => void;
  toggleOpenState: () => void;
};

const useSideBarState = (initialState: boolean = false): StateReturnType => {
  const [open, setOpen] = useState<boolean>(initialState);

  const setOpenState = (state: boolean) => setOpen(state);
  const toggleOpenState = () => setOpen(!open);

  useEffect(() => {
    if (window && window.innerWidth < 1280)
      document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return { open, setOpenState, toggleOpenState };
};
export default useSideBarState;
