"use client";

import { useRef, useState } from "react";

interface IForm {
  loading: boolean;
  error: string;
}

const useForm = () => {
  const controllerRef = useRef<AbortController>();

  const [form, setForm] = useState<IForm>({
    loading: false,
    error: "",
  });

  return [form, setForm, controllerRef] as const;
};
export default useForm;
