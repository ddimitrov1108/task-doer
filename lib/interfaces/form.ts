import { FieldInputProps, FormikProps, FormikValues } from "formik";

export interface IFormField<T> {
  type: "text" | "email" | "password" | "date";
  label: string;
  containerClassName?: string;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  field: FieldInputProps<T>;
  form: FormikProps<FormikValues>;
}

export interface IForm<T> {
  initialState?: T | undefined;
  editMode?: boolean;
  afterSubmit: () => void;
}

export interface IFormModal<T> extends IForm<T> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
