"use client";

import { useRouter } from "next/navigation";
import useForm from "../hooks/useForm";
import { Field, Form, Formik } from "formik";
import { FormErrors, SignInFormValues } from "@/lib/form-schemas";
import Link from "next/link";
import TextField from "./formik/TextField";
import PasswordField from "./formik/PasswordField";
import Button from "../ui/Button";
import dynamic from "next/dynamic";

const Alert = dynamic(() => import("../ui/Alert"));

const SignInForm = () => {
  const router = useRouter();
  const [form, setForm] = useForm();

  const onValidateHandler = async (values: SignInFormValues) => {
    try {
      (await import("@/lib/form-schemas")).signInFormSchema.parse(values);
    } catch (error) {
      if (error instanceof FormErrors) return error.formErrors.fieldErrors;
    }
  };

  const onSubmitHandler = async (values: SignInFormValues) => {
    setForm({ loading: true, error: "" });
    const { signIn } = await import("next-auth/react");

    try {
      await signIn("sign-in", {
        ...values,
        redirect: false,
      });
      router.replace("/todo");
    } catch (e) {
      if (e instanceof Error) setForm({ loading: false, error: e.message });
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
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
          containerClassName="mb-2"
        />

        <div className="mb-8">
          <Link
            aria-disabled={form.loading}
            href="/reset-password"
            className="font-medium text-sm text-primary-main"
            title="Forgotten Password?"
          >
            Forgotten Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={form.loading}
          loading={form.loading}
          fullWidth
        >
          Sign In
        </Button>

        <div className="w-full flex items-center justify-center space-x-2 text-sm text-main mt-4">
          <span>Dont have an account?</span>
          <Link
            aria-disabled={form.loading}
            href="/sign-up"
            className="font-medium text-sm text-primary-main"
            title="Sign Up"
          >
            Sign Up
          </Link>
        </div>
      </Form>
    </Formik>
  );
};
export default SignInForm;
