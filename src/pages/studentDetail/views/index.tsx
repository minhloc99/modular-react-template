import { Provider } from "jotai";
import { studentDetailPageStoreManager } from "../sharedStates";
import { Box, Button, HStack, Show } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { useStudentLogic as useStudentLogic } from "../hooks/useStudentLogic";
import { HookFormProviderWithContext } from "@/shared/components/formControls/hookFormWithContext";
import StudentModel, { getDefaultStudent, getStudentPropName } from "@/shared/models/studentModel";
import VInputWrapperWithLabel from "@/shared/components/formControls/vInputWrapper";
import CustomInput from "@/shared/components/formControls/customInput";

const formId = "StudentListPage";

function StudentDetailPageContent() {
  const formMethods = useForm<StudentModel>({
    defaultValues: getDefaultStudent()
  });
  const {
    showFormControls,
    onSave,
    onCancel,
    onGoBack
  } = useStudentLogic(formMethods);

  return <>
    <HStack
      h="20"
      bg="orange.100"
      px="10"
      justifyContent="space-between"
    >
      <Button
        size="lg"
        colorPalette="blue"
        onClick={onGoBack}
      >Back</Button>
      <Show
        when={showFormControls}
      >
        <HStack>
          <Button
            size="lg"
            colorPalette="gray"
            onClick={onCancel}
          >Cancel</Button>
          <Button
            form={formId}
            type="submit"
            size="lg"
            colorPalette="green"
          >Save</Button>
        </HStack>
      </Show>
    </HStack>
    <HookFormProviderWithContext
      formId={formId}
      methods={formMethods}
      onSave={onSave}
    >
      <Box p="10">
        <VInputWrapperWithLabel
          label="Name"
          required
        >
          <CustomInput
            name={getStudentPropName("name")}
            rules={{ required: "Name is required" }}
          />
        </VInputWrapperWithLabel>
        <VInputWrapperWithLabel
          label="Email"
          required
        >
          <CustomInput
            name={getStudentPropName("email")}
            rules={{ required: "Email is required" }}
          />
        </VInputWrapperWithLabel>
      </Box>
    </HookFormProviderWithContext>
  </>
}

export default function StudentDetailPage() {
  return <Provider
    store={studentDetailPageStoreManager}
  >
    <StudentDetailPageContent />
  </Provider>
}