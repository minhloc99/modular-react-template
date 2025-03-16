import { Textarea, TextareaProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "./errorMessage";

interface CustomTextAreaProps extends TextareaProps {
  rules?: any;
  name: string;
}

export default function CustomTextArea({ name, rules, ...otherProps }: CustomTextAreaProps) {
  const { register } = useFormContext();

  return <>
    <Textarea
      placeholder="Enter here"
      bg="white"
      {...register(name, rules)}
      {...otherProps} />
    <ErrorMessage controlName={name} />
  </>
}