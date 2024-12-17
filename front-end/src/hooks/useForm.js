import { useState } from "react";

export const useForm = (initialValue = {}) => {
  const [form, setForm] = useState(initialValue);

  const inputHandler = ({ target }) => {
    const { name, value } = target;

    setForm({ ...form, [name]: value });
  };

  return {
    form,
    inputHandler,
  };
};
