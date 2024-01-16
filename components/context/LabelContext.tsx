import { ILabel } from "@/lib/interfaces";
import { createContext } from "react";

export const LabelContext = createContext<{
  setLabel: React.Dispatch<React.SetStateAction<ILabel | undefined>>;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);