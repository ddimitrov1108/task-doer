import { ITask } from "@/lib/interfaces";
import DisclousureContainer from "../ui/DisclousureContainer";
import dynamic from "next/dynamic";

const Task = dynamic(() => import("./Task"));

interface Props {
  open?: boolean;
  listTitle: string;
  tasks: ITask[];
}

const ListOfTasks = ({ open = true, listTitle, tasks }: Props) => {
  return (
    !!tasks.length && (
      <DisclousureContainer
        title={listTitle}
        btnClassName="py-2 text-main"
        open={open}
      >
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </DisclousureContainer>
    )
  );
};
export default ListOfTasks;
