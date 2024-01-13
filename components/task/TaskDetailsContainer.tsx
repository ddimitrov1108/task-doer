import { ITask } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { ButtonIcon } from "../ui";
import { X } from "lucide-react";
import { format } from "date-fns";

interface Props {
  task: ITask | undefined;
  open: boolean;
  setOpen: () => void;
}

const TaskDetailsContainer = ({ task, open, setOpen }: Props) => {
  return !task ? null : (
    <div
      className={cn(
        "transition-all hidden bg-black-main h-full overflow-auto styled-overflow",
        open && "xl:block fixed top-0 right-0 bottom-0 w-96"
      )}
    >
      <div className="px-6 py-4">
        <div className="flex items-center w-full justify-between">
          <h1 className="font-medium">Task Details</h1>
          <ButtonIcon
            tabIndex={0}
            aria-label="Close Menu"
            onClick={setOpen}
            className="text-xl"
          >
            <X size={20} />
          </ButtonIcon>
        </div>
      </div>

      <div className="p-6">
        {open && (
          <div className="grid gap-3">
            {task.name}

            {task.description}

            {format(task.due_date, "dd/MM/yyyy")}
          </div>
        )}
      </div>
    </div>
  );
};
export default TaskDetailsContainer;
