"use client";

import { useEffect, useState } from "react";

const useSideBarState = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const toggleIsOpen = () => setIsOpen(!open);

  useEffect(() => {
    if (window && window.innerWidth < 1280)
      document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return [isOpen, setIsOpen, toggleIsOpen] as const;
};
export default useSideBarState;
