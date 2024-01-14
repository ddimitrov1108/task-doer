"use client";

import { ISignUpFormValues } from "../../lib/interfaces";
import { useForm } from "../hooks";
import { SignInResponse } from "next-auth/react";
import { Field, Form, Formik } from "formik";
import { registerSchema } from "@/lib/yup-schemas";
import { PasswordField, TextField } from "./formik";
import { Button } from "../ui";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Alert = dynamic(() => import("../ui/Alert"));

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
    const { signIn } = await import("next-auth/react");

    await signIn("sign-up", {
      ...values,
      redirect: false,
    })
      .then(async (res: SignInResponse | undefined) => {
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
      validationSchema={registerSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error" message={form.error} />}

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
          <Link
            aria-disabled={form.loading}
            href="/sign-in"
            className="font-medium text-sm text-primary-main"
            title="Sign In"
          >
            Sign In
          </Link>
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
