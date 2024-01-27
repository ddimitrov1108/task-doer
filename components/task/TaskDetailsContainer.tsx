import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import ButtonIcon from "../ui/ButtonIcon";
import TaskDetails from "./components/TaskDetails";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskDetailsContainer = ({ open, setOpen }: Props) => {
  return (
    <div
      className={cn(
        "hidden xl:block fixed top-0 right-0 bottom-0 transition-all bg-black-main h-full overflow-auto styled-overflow",
        open ? "w-80" : "w-0"
      )}
    >
      <div className="p-6">
        <div className="flex items-center w-full justify-between mb-10">
          <h1 className="font-medium text-light">Task Details</h1>

          <div className="flex items-center gap-2">
            <ButtonIcon
              aria-label="Close Menu"
              onClick={() => setOpen(false)}
              className="text-main hover:text-light"
            >
              <X size={20} />
            </ButtonIcon>
          </div>
        </div>

        <TaskDetails />
      </div>
    </div>
  );
};
export default TaskDetailsContainer;
