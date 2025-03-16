import { Box, HStack, StackProps, Tag, Text, VStack } from "@chakra-ui/react";

interface VInputWrapperWithLabelProps extends StackProps {
  label: string;
  required?: boolean;
  children: any;
  inputFlex?: number;
}

export function InputLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <HStack>
      <Text
        fontSize="sm"
        fontWeight="bold">
        {label}
      </Text>
      {required &&
        <Tag.Root color={"red"}>
          <Tag.Label>Required</Tag.Label>
        </Tag.Root>
      }
    </HStack>
  );
}

export default function VInputWrapperWithLabel({
  label,
  required,
  children,
  inputFlex,
  ...otherProps
}: VInputWrapperWithLabelProps) {
  return (
    <VStack
      alignItems="flex-start"
      py="1"
      w="full"
      {...otherProps}
    >
      <InputLabel label={label} required={required} />
      <Box w="full" flex={!inputFlex ? "none" : 1}>
        {children}
      </Box>
    </VStack>
  );
}
