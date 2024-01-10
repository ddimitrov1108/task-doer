import { IFormModal, ITaskFormValues } from "@/lib/interfaces"

interface Props {}

const TaskModal = ({
  open,
  setOpen,
  editMode = false,
  initialState = null,
  afterSubmit,
}: IFormModal<ITaskFormValues>) => {
  return (
    <div>TaskModal</div>
  )
}
export default TaskModal