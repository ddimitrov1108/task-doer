"use client";

import { Field, Form, Formik } from "formik";
import { FormErrors, TaskFormValues } from "@/lib/interfaces/form-values";
import Button from "../ui/Button";
import TextField from "./formik/TextField";
import DatePickerField from "./formik/DatePickerField";
import TextareaField from "./formik/TextareaField";
import SwitchField from "./formik/SwitchField";
import dynamic from "next/dynamic";
import useForm from "../hooks/useForm";
import { useParams, usePathname } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskLabelsSelectField from "./formik/TaskLabelsSelectField";

const Alert = dynamic(() => import("../ui/Alert"));

interface Props {
  initialState?: TaskFormValues | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

const TaskForm = ({ initialState, editMode = false, afterSubmit }: Props) => {
  const taskContext = useContext(TaskContext);
  const params = useParams();
  const pathname = usePathname();
  const [form, setForm] = useForm();

  const onValidateHandler = async (values: TaskFormValues) => {
    try {
      (await import("@/lib/interfaces/form-schemas")).taskFormSchema.parse(
        values
      );
    } catch (error) {
      if (error instanceof FormErrors) return error.formErrors.fieldErrors;
    }
  };

  const onSubmitHandler = async (values: TaskFormValues) => {
    setForm({ loading: true, error: "" });

    if (editMode) {
      if (!taskContext?.task) {
        setForm({
          loading: false,
          error: "Something went wrong. Please try again later",
        });
        return;
      }

      const updateTask = (await import("@/app/actions/task/updateTask"))
        .default;

      await updateTask(taskContext.task.id, values)
        .then(({ error }) => {
          if (error) throw error;

          toast.success("Task edited successfully!");
          afterSubmit();
        })
        .catch((e: string) => setForm({ loading: false, error: e }));
    } else {
      const createTask = (await import("@/app/actions/task/createTask"))
        .default;

      await createTask(
        pathname.startsWith("/todo/project/") ? params.id.toString() : null,
        values
      )
        .then(({ error }) => {
          if (error) throw error;

          toast.success("Task created successfully!");
          afterSubmit();
        })
        .catch((e: string) => setForm({ loading: false, error: e }));
    }
  };

  return (
    <Formik
      initialValues={
        initialState
          ? initialState
          : {
              name: "",
              description: "",
              important: false,
              completed: false,
              dueDate: format(new Date(), "yyyy-MM-dd"),
              labels: [],
            }
      }
      validate={onValidateHandler}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error" message={form.error} />}

        <Field
          id="name"
          name="name"
          label="Name"
          placeholder="My Task Name"
          disabled={form.loading}
          maxLength={60}
          component={TextField}
          fullWidth
        />

        <Field
          id="dueDate"
          name="dueDate"
          label="Due Date"
          disabled={form.loading}
          component={DatePickerField}
          fullWidth
        />

        <Field
          id="labels"
          name="labels"
          label="Labels"
          disabled={form.loading}
          component={TaskLabelsSelectField}
          fullWidth
        />

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
          component={SwitchField}
          fullWidth
        />

        <Field
          id="completed"
          name="completed"
          label="Completed"
          type="checkbox"
          disabled={form.loading}
          maxLength={4}
          component={SwitchField}
          fullWidth
        />

        <div className="flex flex-col-reverse md:flex-row gap-2 justify-between items-center">
          <Button
            variant="text"
            disabled={form.loading}
            onClick={afterSubmit}
            fullWidth
          >
            Cancel
          </Button>

          <Button
            type="submit"
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
