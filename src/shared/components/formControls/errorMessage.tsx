import { Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface ErrorMessageProps {
  controlName: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export function extractErrorObject(errors: any, name: string): any {
  if (!errors) return null;
  if (!name) throw new Error("Control name is not valid");
  if (name.indexOf(".") === -1) return errors[name];

  const paths = name.split(".");

  return extractErrorObject(errors[paths.shift() as string], paths.join("."));
}

export default function ErrorMessage({
  controlName
}: ErrorMessageProps) {
  const { formState: { errors } } = useFormContext();
  const errorObject = extractErrorObject(errors, controlName)

  return errorObject ?
    <Text
      mt="2"
      color="red"
      fontSize="xs">
      {String(errorObject.message)}
    </Text> :
    null;
}