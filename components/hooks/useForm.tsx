"use client";

import { useRef, useState } from "react";

interface IState {
  loading: boolean;
  error: string;
}

const useForm = () => {
  const abortControllerRef = useRef<AbortController>();

  const [form, setForm] = useState<IState>({
    loading: false,
    error: "",
  });

  return [form, setForm, abortControllerRef] as const;
};
export default useForm;
