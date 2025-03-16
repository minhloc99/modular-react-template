import useDataFetcher from "@/shared/hooks/useDataFetcher";
import { addOrUpdateStudentItem, getStudentItem } from "@/shared/services/studentRepository.service";
import { originalStudentAtom, studentDetailPageStoreManager } from "../sharedStates";
import { toaster } from "@/shared/components/layout/toaster";
import { appStoreManager, isLoadingAtom } from "@/shared/sharedStates";
import { UseFormReturn } from "react-hook-form";
import { IS_CREATE_MODE } from "@/shared/constants";
import StudentModel from "@/shared/models/studentModel";
import useAppNavigation from "@/shared/hooks/useAppNavigation";

export function useStudentLogic(formMethods: UseFormReturn<StudentModel, any, undefined>) {
  const {
    params: { id },
    ...navigator
  } = useAppNavigation();
  const isFormDirty = formMethods.formState.isDirty;

  const {
    loadDebounce
  } = useDataFetcher<StudentModel | undefined>(
    async () => await getStudentItem(id as string),
    !!id,
    {
      onSuccess: (loadedData) => {
        studentDetailPageStoreManager.set(originalStudentAtom, loadedData);
        formMethods.reset(loadedData);
      },
      onError: (error) => {
        toaster.create({
          title: `System error`,
          type: "error",
          description: `An error occurred while loading student. ${error.message}`
        })
      },
      onUpdateLoading: (isLoading: boolean) => {
        appStoreManager.set(isLoadingAtom, isLoading);
      }
    }
  );

  return {
    showFormControls: isFormDirty || id === IS_CREATE_MODE,
    onSave: async (currentData: StudentModel) => {
      const originalData = studentDetailPageStoreManager.get(originalStudentAtom) as StudentModel;

      appStoreManager.set(isLoadingAtom, true);
      await addOrUpdateStudentItem(id as string, originalData, currentData);
      toaster.create({
        title: `Success`,
        type: "success",
        description: `Student data has been saved successfully`
      });

      if (id === IS_CREATE_MODE) {
        return navigator.navigateToStudentListPage();
      }

      await loadDebounce();
    },
    onCancel: (e: any) => {
      e.preventDefault();

      if (id === IS_CREATE_MODE) {
        return navigator.navigateToStudentListPage();
      }

      formMethods.reset(studentDetailPageStoreManager.get(originalStudentAtom));
    },
    onGoBack: navigator.navigateToStudentListPage
  }
}