"use client";

import dynamic from "next/dynamic";
import useForm from "../hooks/useForm";
import { ChangePasswordFormValues, FormErrors } from "@/lib/form-schemas";
import PasswordField from "./formik/PasswordField";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { toast } from "sonner";

const Alert = dynamic(() => import("../ui/Alert"));

interface Props {
  reset_password_token: string;
}

const ChangePasswordWithTokenForm = ({ reset_password_token }: Props) => {
  const router = useRouter();
  const [form, setForm] = useForm();

  const onValidateHandler = async (values: ChangePasswordFormValues) => {
    try {
      (await import("@/lib/form-schemas")).changePasswordSchema.parse(values);

      if (values.password !== values.confirmPassword)
        throw new Error("Passwords do not match.");
      else setForm({ loading: false, error: "" });
    } catch (error) {
      if (error instanceof FormErrors) return error.formErrors.fieldErrors;
      else if (error instanceof Error)
        setForm({ loading: false, error: error.message });
    }
  };

  const onSubmitHandler = async (values: ChangePasswordFormValues) => {
    setForm({ loading: true, error: "" });

    const { changePasswordByToken } = await import(
      "@/app/actions/user/changePasswordByToken"
    );

    await changePasswordByToken(reset_password_token, values)
      .then(({ error }) => {
        if (error) throw error;

        toast.success("Password changed successfully.");
        router.replace("/sign-in");
      })
      .catch((e: string) => {
        setForm({ loading: false, error: e });
      });
  };

  return (
    <Formik
      initialValues={{ password: "", confirmPassword: "" }}
      validate={onValidateHandler}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error" message={form.error} />}

        <Field
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••••"
          disabled={form.loading}
          maxLength={20}
          component={PasswordField}
          fullWidth
        />

        <Field
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••••"
          disabled={form.loading}
          maxLength={20}
          component={PasswordField}
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
export default ChangePasswordWithTokenForm;
