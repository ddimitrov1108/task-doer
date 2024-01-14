"use client";

import { useParams } from "next/navigation";
import { useForm } from "../hooks";
import { toast } from "sonner";
import { Button } from "../ui";
import { TextField } from "./formik";
import { Field, Form, Formik } from "formik";
import { labelSchema } from "@/lib/yup-schemas";
import { ILabelFormValues } from "@/lib/interfaces";
import dynamic from "next/dynamic";

const Alert = dynamic(() => import("../ui/Alert"));

interface Props {
  initialState?: ILabelFormValues | null;
  editMode?: boolean;
  afterSubmit: () => void;
}

const initialValues: ILabelFormValues = { name: "" };

const LabelForm = ({ initialState, editMode = false, afterSubmit }: Props) => {
  const params = useParams();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values: ILabelFormValues) => {
    if (!values) return;

    setForm({ loading: true, error: "" });

    if (editMode) {
      const { updateLabel } = await import("@/app/actions");

      await updateLabel(params.id.toString(), values)
        .then(({ error }) => {
          if (error) throw error;

          toast.success("Label edited successfully!");
          setForm({ ...form, loading: false });
          afterSubmit();
        })
        .catch((e: string) => {
          console.error(e);
          setForm({ ...form, error: e, loading: false });
        });
    } else {
      const { createLabel } = await import("@/app/actions");

      await createLabel(values)
        .then(({ error }) => {
          if (error) throw error;

          toast.success("Label created successfully!");
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
      validationSchema={labelSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error" message={form.error} />}

        <Field
          id="name"
          name="name"
          label="Enter name"
          placeholder="My Label Name"
          disabled={form.loading}
          maxLength={30}
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
