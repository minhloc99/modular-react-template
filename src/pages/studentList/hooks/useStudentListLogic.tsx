
import useDataFetcher from "@/shared/hooks/useDataFetcher";
import { deleteStudentDialogPropsAtom, studentListAtom, studentListPageStoreManager } from "../sharedStates";
import { deleteStudentItem, getStudentItemList } from "@/shared/services/studentRepository.service";
import { toaster } from "@/shared/components/layout/toaster";
import { appStoreManager, isLoadingAtom } from "@/shared/sharedStates";
import StudentModel, { getStudentPropName } from "@/shared/models/studentModel";
import { orderBy } from "lodash";

export function useStudentListLogic() {
  const {
    loadDebounce
  } = useDataFetcher<StudentModel[]>(
    async () => await getStudentItemList(),
    true,
    {
      onSuccess: (loadedData) => {
        const sortedStudentList = orderBy(loadedData, [getStudentPropName("updatedAt")], ["desc"]);

        studentListPageStoreManager.set(studentListAtom, sortedStudentList);
      },
      onError: (error) => {
        toaster.create({
          title: `System error`,
          type: "error",
          description: `An error occurred while loading student list. ${error.message}`
        })
      },
      onUpdateLoading: (isLoading: boolean) => {
        appStoreManager.set(isLoadingAtom, isLoading);
      }
    }
  );

  return {
    onDeleteStudent: async (id: string) => {
      appStoreManager.set(isLoadingAtom, true);
      await deleteStudentItem(id);
      toaster.create({
        title: `Success`,
        type: "success",
        description: `Student data has been deleted successfully`
      });
      studentListPageStoreManager.set(deleteStudentDialogPropsAtom, {
        isOpen: false
      });
      await loadDebounce();
    }
  }
}