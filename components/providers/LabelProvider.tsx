"use client";

import { ReactNode, createContext } from "react";

export const LabelContext = createContext(null);

interface Props {
  children: ReactNode;
}
const LabelProvider = ({ children }: Props) => {
  return <LabelContext.Provider value={null}>{children}</LabelContext.Provider>;
};
export default LabelProvider;
