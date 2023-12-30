"use client";

import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "@/lib/yup-schemas";
import { Alert, Button, TextLink } from "../ui";
import { PasswordField, TextField } from "./formik";
import { useForm } from "../hooks";
import { ISignInValues } from "../../lib/interfaces";

const initialValues: ISignInValues = { email: "", password: "" };

const SignInForm = () => {
  const router = useRouter();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values: ISignInValues) => {
    if (!values) return;

    setForm({ ...form, loading: true, error: "" });
    const { email, password } = values;

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
        {form.error && <Alert variant="error">{form.error}</Alert>}

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
          <TextLink
            href="/sign-up"
            className="font-medium text-sm text-primary-main"
            title="Sign Up"
          >
            Sign Up
          </TextLink>
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
