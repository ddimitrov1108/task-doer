"use client";

import { useRouter } from "next/navigation";
import { SignInResponse } from "next-auth/react";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "@/lib/yup-schemas";
import { useForm } from "../hooks";
import { ISignInFormValues } from "../../lib/interfaces";
import { Button } from "../ui";
import { PasswordField, TextField } from "./formik";
import dynamic from "next/dynamic";
import Link from "next/link";

const Alert = dynamic(() => import("../ui/Alert"));

const initialValues: ISignInFormValues = { email: "", password: "" };

const SignInForm = () => {
  const router = useRouter();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values: ISignInFormValues) => {
    if (!values) return;

    setForm({ loading: true, error: "" });

    const { signIn } = await import("next-auth/react");

    await signIn("sign-in", {
      ...values,
      redirect: false,
    })
      .then((res: SignInResponse | undefined) => {
        if (res?.error) throw res.error;

        router.replace("/todo");
      })
      .catch((e) => {
        setForm({
          loading: false,
          error: e,
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
