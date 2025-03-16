import { useController, useFormContext } from 'react-hook-form';
import { Box, Center, HStack, StackProps } from '@chakra-ui/react';  // Optional, can replace with custom styles
import { FaCheck } from 'react-icons/fa';
import ErrorMessage from './errorMessage';

interface CustomCheckboxProps extends StackProps {
  name: string;
  rules?: any;
  fontWeight?: string;
  onLiveChange?: (fieldName: string, changedValue: any) => void;
}

function CustomCheckbox({
  name,
  onLiveChange,
  rules,
  ...rest
}: CustomCheckboxProps) {
  const { control } = useFormContext();
  const { field } = useController({
    control,
    name,
    rules,
  });

  return <HStack
    {...rest}
  >
    <Box
      display="flex"
      alignItems="center"
      userSelect="none"
      cursor="pointer"
      onClick={e => {
        const newValue = !field.value;

        e.preventDefault();
        field.onChange(newValue);

        if (!onLiveChange)
          return;

        onLiveChange(name, newValue);
      }}
    >
      <Center
        w="18px"
        h="18px"
        border={`2px solid ${field.value ? "blue.500" : "#0000001a"}`}
        borderRadius="2px"
        fontWeight="semibold"
        bg={field.value ? "blue.500" : "white"}
      >
        {field.value ? <FaCheck size={12} color="white" /> : <></>}
      </Center>
    </Box>
    <ErrorMessage
      controlName={name}
    />
  </HStack>
};

export default CustomCheckbox;
