"use client";

import { useRouter } from "next/navigation";
import useForm from "../hooks/useForm";
import { Field, Form, Formik } from "formik";
import { FormErrors, SignUpFormValues } from "@/lib/interfaces/form-values";
import Link from "next/link";
import TextField from "./formik/TextField";
import PasswordField from "./formik/PasswordField";
import Button from "../ui/Button";
import dynamic from "next/dynamic";

const Alert = dynamic(() => import("../ui/Alert"));

const SignUpForm = () => {
  const router = useRouter();
  const [form, setForm] = useForm();

  const onValidateHandler = async (values: SignUpFormValues) => {
    try {
      (await import("@/lib/interfaces/form-schemas")).signUpFormSchema.parse(values);

      if (values.password !== values.confirmPassword)
        throw new Error("Passwords do not match.");
      else setForm({ loading: false, error: "" });
    } catch (error) {
      if (error instanceof FormErrors) return error.formErrors.fieldErrors;
      else if (error instanceof Error)
        setForm({ loading: false, error: error.message });
    }
  };

  const onSubmitHandler = async (values: SignUpFormValues) => {
    setForm({ loading: true, error: "" });
    const { signIn } = await import("next-auth/react");

    await signIn("sign-up", {
      ...values,
      redirect: false,
    })
      .then(async (res) => {
        if (res?.error) throw res.error;
        router.replace("/todo");
      })
      .catch((e: string) => setForm({ loading: false, error: e }));
  };

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validate={onValidateHandler}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error" message={form.error} />}

        <div className="md:flex gap-4 justify-between">
          <Field
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="e.g. Daniel"
            disabled={form.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />

          <Field
            id="lastName"
            name="lastName"
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
          containerClassName="mb-8"
        />

        <Button
          type="submit"
          disabled={form.loading}
          loading={form.loading}
          fullWidth
        >
          Sign Up
        </Button>

        <div className="w-full flex items-center justify-center space-x-2 text-sm text-main mt-4">
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
      </Form>
    </Formik>
  );
};
export default SignUpForm;
