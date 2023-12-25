"use client";

import { useState } from "react";

interface IForm {
  loading: boolean;
  error: string;
}

const useForm = () => {
  const [form, setForm] = useState<IForm>({
    loading: false,
    error: "",
  });

  return [form, setForm] as const;
};
export default useForm;
