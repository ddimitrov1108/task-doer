import { FormModal, TaskFormValues } from "@/lib/interfaces"

interface Props {}

const TaskModal = ({
  open,
  setOpen,
  editMode = false,
  initialState,
  afterSubmit,
}: FormModal<TaskFormValues>) => {
  return (
    <div>TaskModal</div>
  )
}
export default TaskModal