"use client";

import { ILabel } from "@/lib/interfaces";
import { ReactNode, useContext, useEffect } from "react";
import { StorageContext } from "../providers";

interface Props {
  value: ILabel;
  children: ReactNode;
}

const LabelWrapper = ({ value, children }: Props) => {
  const storageContext = useContext(StorageContext);

  useEffect(() => {
    storageContext?.setLabel(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return children;
};
export default LabelWrapper;
