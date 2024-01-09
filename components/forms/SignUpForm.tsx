"use client";

import { useRouter } from "next/navigation";
import { ISignUpFormValues } from "../../lib/interfaces";
import { useForm } from "../hooks";
import { SignInResponse, signIn } from "next-auth/react";
import { Alert, Button, TextLink } from "../ui";
import { PasswordField, TextField } from "./formik";
import { Field, Form, Formik } from "formik";
import { registerSchema } from "@/lib/yup-schemas";

const initialValues: ISignUpFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const router = useRouter();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values: ISignUpFormValues) => {
    if (!values) return;

    setForm({ loading: true, error: "" });
    const { first_name, last_name, email, password, confirmPassword } = values;

    await signIn("sign-up", {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      redirect: false,
    }).then((value: SignInResponse | undefined): void | PromiseLike<void> => {
      if (!value?.error) {
        router.replace("/todo");
        return;
      }

      setForm({
        loading: false,
        error: value?.error || "Something went wrong. Please try again later",
      });
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error">{form.error}</Alert>}

        <div className="md:flex gap-4 justify-between">
          <Field
            id="first_name"
            name="first_name"
            label="First Name"
            placeholder="e.g. Daniel"
            disabled={form.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />

          <Field
            id="last_name"
            name="last_name"
            label="Last Name"
            placeholder="e.g. Dimitrov"
            disabled={form.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
        </div>

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

        <div className="w-full flex mt-1 space-x-2 text-sm text-main">
          <span>Already have an account?</span>
          <TextLink
            href="/sign-in"
            className="font-medium text-sm text-primary-main"
            title="Sign In"
          >
            Sign In
          </TextLink>
        </div>

        <Button
          type="submit"
          className="flex justify-center mt-8"
          disabled={form.loading}
          loading={form.loading}
          fullWidth
        >
          Sign Up
        </Button>
      </Form>
    </Formik>
  );
};
export default SignUpForm;
