"use client";

import { useState } from "react";

interface State {
  loading: boolean;
  error: string;
}

const useForm = () => {
  const [form, setForm] = useState<State>({
    loading: false,
    error: "",
  });

  return [form, setForm] as const;
};
export default useForm;
