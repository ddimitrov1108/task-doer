"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "../hooks";
import { Alert, Button } from "../ui";
import { Field, Form, Formik } from "formik";
import { ColorPickerField, TextField } from "./formik";
import { projectSchema } from "@/lib/yup-schemas";
import { toast } from "sonner";
import { INewProject } from "@/lib/interfaces";

interface Props {
  initialState?: INewProject | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

const initialValues: INewProject = { name: "", color: "#b8255f" };

const ProjectForm = ({
  initialState,
  editMode = false,
  afterSubmit,
}: Props) => {
  const params = useParams();
  const router = useRouter();
  const [form, setForm, controllerRef] = useForm();

  const onSubmitHandler = async (values: INewProject) => {
    if (!values) return;

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    setForm({ loading: true, error: "" });
    const { name, color } = values;

    if (editMode) {
      await fetch(`/api/project/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          color,
        }),
        signal,
      })
        .then((data) => data.json())
        .then(({ error }: { error?: string }) => {
          if (error) throw error;

          toast.success("Project edited successfully!");
          router.refresh();
          afterSubmit();
        })
        .catch((error) => {
          setForm({ ...form, error: error });
        });
    } else {
      await fetch("/api/project", {
        method: "POST",
        body: JSON.stringify({
          name,
          color,
        }),
        signal,
      })
        .then((data) => data.json())
        .then(({ href, error }: { href?: string; error?: string }) => {
          if (error) throw error;

          if (!href) throw "Something went wrong.";

          toast.success("Project created successfully!");
          router.replace(href);
          router.refresh();
          afterSubmit();
        })
        .catch((error) => {
          setForm({ ...form, error: error });
        });
    }
  };

  return (
    <Formik
      initialValues={initialState || initialValues}
      validationSchema={projectSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error">{form.error}</Alert>}

        <Field
          id="name"
          name="name"
          label="Enter name"
          placeholder="My Project Name"
          disabled={form.loading}
          maxLength={40}
          component={TextField}
          fullWidth
        />

        <Field
          id="color"
          name="color"
          label="Color"
          disabled={form.loading}
          maxLength={9}
          component={ColorPickerField}
          className="mb-8"
          fullWidth
        />

        <div className="flex flex-col-reverse md:flex-row gap-4 justify-between items-center">
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
            {editMode ? "Edit Project" : "Create Project"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
export default ProjectForm;
