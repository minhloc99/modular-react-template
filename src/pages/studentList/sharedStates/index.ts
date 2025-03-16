import StudentModel from "@/shared/models/studentModel";
import { atom, createStore } from "jotai";

export const studentListPageStoreManager = createStore();
export const studentListAtom = atom<StudentModel[]>([]);
export const deleteStudentDialogPropsAtom = atom<{
  isOpen: boolean;
  data?: StudentModel;
  onConfirm?: () => void;
}>({
  isOpen: false
});
