"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "../hooks";
import { toast } from "sonner";
import { Alert, Button } from "../ui";
import { TextField } from "./formik";
import { Field, Form, Formik } from "formik";
import { labelSchema } from "@/lib/yup-schemas";
import { ILabelFormValues } from "@/lib/interfaces";

interface Props {
  initialState?: ILabelFormValues | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

const initialValues: ILabelFormValues = { name: "" };

const LabelForm = ({ initialState, editMode = false, afterSubmit }: Props) => {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values: ILabelFormValues) => {
    if (!values) return;

    setForm({ loading: true, error: "" });

    const reqBody: string = JSON.stringify({ name: values.name });

    if (editMode) {
      await fetch(`/api/label/${params.id}`, {
        method: "PUT",
        body: reqBody,
      })
        .then((data) => data.json())
        .then(({ error }: { error?: string }) => {
          if (error) throw error;

          toast.success("Label edited successfully!");
          router.refresh();
          afterSubmit();
        })
        .catch((error) => {
          setForm({ ...form, error: error });
        });
    } else {
      await fetch("/api/label", {
        method: "POST",
        body: reqBody,
      })
        .then((data) => data.json())
        .then(({ error }: { error?: string }) => {
          if (error) throw error;

          toast.success("Label created successfully!");
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
      validationSchema={labelSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error">{form.error}</Alert>}

        <Field
          id="name"
          name="name"
          label="Enter name"
          placeholder="My Label Name"
          disabled={form.loading}
          maxLength={20}
          component={TextField}
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
            {editMode ? "Edit Label" : "Create Label"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
export default LabelForm;
