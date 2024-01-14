"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "../hooks";
import { Alert, Button } from "../ui";
import { Field, Form, Formik } from "formik";
import { ColorPickerField, TextField } from "./formik";
import { projectSchema } from "@/lib/yup-schemas";
import { toast } from "sonner";
import { IProjectFormValues } from "@/lib/interfaces";
import { createProject, updateProject } from "@/app/actions";
import { ProjectContext } from "../providers";

interface Props {
  initialState?: IProjectFormValues | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

const initialValues: IProjectFormValues = { name: "", color: "#b8255f" };

const ProjectForm = ({
  initialState,
  editMode = false,
  afterSubmit,
}: Props) => {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values: IProjectFormValues) => {
    if (!values) return;

    setForm({ ...form, loading: true, error: "" });

    if (editMode) {
      await updateProject(params.id.toString(), values)
        .then(({ error }) => {
          if (error) throw error;

          toast.success("Project edited successfully!");
          setForm({ ...form, loading: false });
          afterSubmit();
        })
        .catch((e: string) => {
          console.error(e);
          setForm({ ...form, error: e, loading: false });
        });
    } else {
      await createProject(values)
        .then(({ error, href }) => {
          if (error) throw error;

          if (href) {
            toast.success("Project created successfully!");
            router.replace(href);
          }

          setForm({ ...form, loading: false });
          afterSubmit();
        })
        .catch((e: string) => {
          console.error(e);
          setForm({ ...form, error: e, loading: false });
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
        {form.error && <Alert variant="error" message={form.error}/>}

        <Field
          id="name"
          name="name"
          label="Enter name"
          placeholder="My Project Name"
          disabled={form.loading}
          maxLength={30}
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
