
import StudentModel from "@/shared/models/studentModel";
import { atom, createStore } from "jotai";

export const studentDetailPageStoreManager = createStore();
export const originalStudentAtom = atom<StudentModel | undefined>();

