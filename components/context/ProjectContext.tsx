import { Project } from "@/lib/interfaces";
import { createContext } from "react";

export const ProjectContext = createContext<{
  setProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);
