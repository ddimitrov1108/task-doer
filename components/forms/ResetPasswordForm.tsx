"use client";

import dynamic from "next/dynamic";
import useForm from "../hooks/useForm";
import { ResetPasswordFormValues, FormErrors } from "@/lib/interfaces/form-values";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import TextField from "./formik/TextField";
import { toast } from "sonner";

const Alert = dynamic(() => import("../ui/Alert"));

const ResetPasswordForm = () => {
  const router = useRouter();
  const [form, setForm] = useForm();

  const onValidateHandler = async (values: ResetPasswordFormValues) => {
    try {
      (await import("@/lib/interfaces/form-schemas")).resetPasswordSchema.parse(values);
    } catch (error) {
      if (error instanceof FormErrors) return error.formErrors.fieldErrors;
    }
  };

  const onSubmitHandler = async (values: ResetPasswordFormValues) => {
    setForm({ loading: true, error: "" });
    const { resetPassword } = await import("@/app/actions/user/resetPassword");

    await resetPassword(values)
      .then(({ error }) => {
        if (error) throw error;

        toast.success("Reset password link was send to your email address.");
        router.replace("/sign-in");
      })
      .catch((e: string) => {
        setForm({ loading: false, error: e });
      });
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validate={onValidateHandler}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error" message={form.error} />}

        <Field
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="name@address.com"
          disabled={form.loading}
          maxLength={60}
          component={TextField}
          fullWidth
        />

        <Button
          type="submit"
          className="mt-8"
          disabled={form.loading}
          loading={form.loading}
          fullWidth
        >
          Change Password
        </Button>
      </Form>
    </Formik>
  );
};
export default ResetPasswordForm;
