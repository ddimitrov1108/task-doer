"use client";

import { useState } from "react";

interface IState {
  loading: boolean;
  error: string;
}

const useForm = () => {
  const [form, setForm] = useState<IState>({
    loading: false,
    error: "",
  });

  return [form, setForm] as const;
};
export default useForm;
