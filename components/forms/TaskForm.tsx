"use client";

import { Field, Form, Formik } from "formik";
import {
  CheckboxField,
  DatePickerField,
  TextField,
  TextareaField,
} from "./formik";
import { Alert, Button } from "../ui";
import { useForm } from "../hooks";
import { ITaskFormValues } from "@/lib/interfaces";
import { taskSchema } from "@/lib/yup-schemas";
import { format } from "date-fns";

interface Props {
  initialState?: ITaskFormValues | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

//format(new Date(), "yyyy-MM-dd")
//format(new Date(initialState.due_date), "yyyy-MM-dd")

const initialValues = {
  name: "",
  description: "",
  important: false,
  completed: false,
  due_date: format(new Date(), "yyyy-MM-dd"),
  labels: [],
};

const TaskForm = ({ initialState, editMode = false, afterSubmit }: Props) => {
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values: ITaskFormValues) => {};

  return (
    <Formik
      initialValues={
        initialState
          ? {
              ...initialState,
              due_date: format(new Date(initialState.due_date), "yyyy-MM-dd"),
            }
          : initialValues
      }
      validationSchema={taskSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error">{form.error}</Alert>}

        <Field
          id="name"
          name="name"
          label="Name"
          placeholder="My Task Name"
          disabled={form.loading}
          maxLength={40}
          component={TextField}
          fullWidth
        />

        <Field
          id="due_date"
          name="due_date"
          label="Due Date"
          disabled={form.loading}
          component={DatePickerField}
          fullWidth
        />
        {/*
        <Field
          id="labels"
          name="labels"
          label="Labels"
          disabled={form.loading}
          component={LabelsSelectField}
          fullWidth
        />
*/}
        <Field
          id="description"
          name="description"
          label="Description"
          placeholder="Walk the doggo"
          disabled={form.loading}
          maxLength={255}
          component={TextareaField}
          fullWidth
        />

        <Field
          id="important"
          name="important"
          label="Important"
          type="checkbox"
          disabled={form.loading}
          maxLength={4}
          component={CheckboxField}
          fullWidth
        />

        <div className="flex flex-col-reverse md:flex-row gap-2 justify-between items-center">
          <Button
            variant="text"
            className="flex justify-center"
            disabled={form.loading}
            onClick={afterSubmit}
            fullWidth
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="flex justify-center"
            disabled={form.loading}
            loading={form.loading}
            fullWidth
          >
            {editMode ? "Edit Task" : "Create Task"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
export default TaskForm;