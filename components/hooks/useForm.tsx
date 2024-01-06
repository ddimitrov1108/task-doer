"use client";

import { useRef, useState } from "react";

interface IFormState {
  loading: boolean;
  error: string;
}

const useForm = () => {
  const abortControllerRef = useRef<AbortController>();

  const [form, setForm] = useState<IFormState>({
    loading: false,
    error: "",
  });

  return [form, setForm, abortControllerRef] as const;
};
export default useForm;
