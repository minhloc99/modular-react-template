import { InputProps, Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "./errorMessage";

interface CustomInputProps extends InputProps {
  rules?: any;
  name: string;
}

export default function CustomInput({ name, rules, ...otherProps }: CustomInputProps) {
  const { register } = useFormContext();

  return <>
    <Input
      placeholder="Enter here"
      bg="white"
      {...register(name, rules)}
      {...otherProps} />
    <ErrorMessage controlName={name} />
  </>
}