import { useEffect, useState } from "react";

const useSideBarState = (initialState: boolean = false) => {
  const [open, setOpen] = useState<boolean>(initialState);
  const toggleOpen = () => setOpen(!open);

  useEffect(() => {
    if (window && window.innerWidth < 1280)
      document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return [open, setOpen, toggleOpen] as const;
};
export default useSideBarState;
