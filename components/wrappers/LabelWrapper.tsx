"use client";

import { ILabel } from "@/lib/interfaces";
import { ReactNode, useContext, useEffect } from "react";

interface Props {
  label: ILabel;
  children: ReactNode;
}
const LabelWrapper = ({ label, children }: Props) => {

  useEffect(() => {
    // labelContext?.setProject(label);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label]);

  return children;
};
export default LabelWrapper;
