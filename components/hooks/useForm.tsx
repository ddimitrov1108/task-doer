"use client";

import { useState } from "react";

interface IForm {
  loading: boolean;
  error: string;
  disabled: boolean;
}

type FormReturnType = {
  form: IForm;
  setFormState: (state: IForm) => void;
};

const useForm = (): FormReturnType => {
  const [form, setForm] = useState<IForm>({
    loading: false,
    error: "",
    disabled: false,
  });

  const setFormState = (state: IForm) => setForm(state);

  return { form, setFormState };
};
export default useForm;
