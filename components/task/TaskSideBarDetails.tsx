import dynamic from "next/dynamic";
import TaskDetails from "./components/TaskDetails";

const SideBar = dynamic(() => import("../ui/SideBar"));

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskSideBarDetails = ({ open, setOpen }: Props) => {
  return (
    <SideBar
      open={open}
      setOpen={setOpen}
      showFrom="right"
      title={<span className="text-light">Task Details</span>}
      className="xl:hidden"
      containerClassName="sm:w-80 bg-black-main px-0"
      headerClassName="pt-6 px-6"
      bodyClassName="w-full grid gap-4 px-6 bg-inherit mt-10"
    >
      <TaskDetails />
    </SideBar>
  );
};
export default TaskSideBarDetails;
