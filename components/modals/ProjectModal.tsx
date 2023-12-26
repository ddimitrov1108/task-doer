interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
  initialState: { name: string; color: string } | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

const ProjectModal = ({
  isOpen,
  setIsOpen,
  editMode = false,
  initialState = null,
  afterSubmit,
}: Props) => {
  return <div>ProjectModal</div>;
};
export default ProjectModal;
