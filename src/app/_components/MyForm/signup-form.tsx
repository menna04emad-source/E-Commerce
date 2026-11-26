"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MyForm from "./MyForm";
import { signupSchema, type SignupFormValues } from "./signup.logic";

export default function SignupForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      terms: false,
    },
  });

  return (
    <MyForm
      control={control}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
