import { useState } from "react";

type State = {
  loading: boolean;
  error: string;
};

const useForm = () => {
  const [form, setForm] = useState<State>({
    loading: false,
    error: "",
  });

  return [form, setForm] as const;
};
export default useForm;
