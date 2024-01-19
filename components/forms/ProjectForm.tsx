"use client";

import { useParams, useRouter } from "next/navigation";
import useForm from "../hooks/useForm";
import { Field, Form, Formik } from "formik";
import { FormErrors, ProjectFormValues } from "@/lib/form-schemas";
import { toast } from "sonner";
import { IForm } from "@/lib/interfaces";
import Button from "../ui/Button";
import TextField from "./formik/TextField";
import ColorPickerField from "./formik/ColorPickerField";
import dynamic from "next/dynamic";

const Alert = dynamic(() => import("../ui/Alert"));

const ProjectForm = ({
  initialState,
  editMode = false,
  afterSubmit,
}: IForm<ProjectFormValues>) => {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useForm();

  const onValidateHandler = async (values: ProjectFormValues) => {
    try {
      (await import("@/lib/form-schemas")).projectFormSchema.parse(values);
    } catch (error) {
      if (error instanceof FormErrors) return error.formErrors.fieldErrors;
    }
  };

  const onSubmitHandler = async (values: ProjectFormValues) => {
    setForm({ loading: true, error: "" });

    if (editMode) {
      const { updateProject } = await import(
        "@/app/actions/project/updateProject"
      );

      await updateProject(params.id.toString(), values)
        .then(({ error }) => {
          if (error) throw error;

          toast.success("Project edited successfully!");
          afterSubmit();
        })
        .catch((e: string) => setForm({ loading: false, error: e }));
    } else {
      const { createProject } = await import(
        "@/app/actions/project/createProject"
      );

      await createProject(values)
        .then(({ error, href }) => {
          if (error) throw error;

          if (href) {
            toast.success("Project created successfully!");
            router.replace(href);
          }

          afterSubmit();
        })
        .catch((e: string) => setForm({ loading: false, error: e }));
    }
  };

  return (
    <Formik
      initialValues={initialState || { name: "", color: "#b8255f" }}
      validate={onValidateHandler}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error" message={form.error} />}

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
