"use client";

import { SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "@/lib/yup-schemas";
import { useForm } from "../hooks";
import { ISignInFormValues } from "../../lib/interfaces";
import dynamic from "next/dynamic";
import Link from "next/link";

const Alert = dynamic(() => import("../ui/Alert"));
const Button = dynamic(() => import("../ui/Button"));
const TextField = dynamic(() => import("./formik/TextField"));
const PasswordField = dynamic(() => import("./formik/PasswordField"));

const initialValues: ISignInFormValues = { email: "", password: "" };

const SignInForm = () => {
  const router = useRouter();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values: ISignInFormValues) => {
    if (!values) return;

    setForm({ ...form, loading: true, error: "" });

    const { email, password } = values;
    const { signIn } = await import("next-auth/react");

    await signIn("sign-in", {
      email,
      password,
      redirect: false,
    }).then((value: SignInResponse | undefined): void | PromiseLike<void> => {
      if (!value?.error) {
        router.replace("/todo");
        return;
      }

      setForm({
        ...form,
        loading: false,
        error: value.error,
      });
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
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
        />

        <div className="w-full flex mt-1 space-x-2 text-sm text-main">
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

        <Button
          type="submit"
          className="flex justify-center mt-8"
          disabled={form.loading}
          loading={form.loading}
          fullWidth
        >
          Sign In
        </Button>
      </Form>
    </Formik>
  );
};
export default SignInForm;
