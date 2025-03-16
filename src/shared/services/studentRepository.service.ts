import { IS_CREATE_MODE } from "../constants";
import { LocalStorageService } from "../localStorage";
import StudentModel from "../models/studentModel";
import { simulateAsyncApiCall } from "./customPromise.service";
import { compareObjects, isObjectEmpty } from "./object.service";
import { getShortUuid } from "./uuid.service";

const storageManager = new LocalStorageService("studentCollection");

export async function getStudentItem(id: string): Promise<StudentModel | undefined> {
  const result = storageManager.getItem(id);

  return await simulateAsyncApiCall(result);
}

export async function getStudentItemList(): Promise<StudentModel[]> {
  const results = storageManager.getItemList();

  return await simulateAsyncApiCall(results);
}

export async function addOrUpdateStudentItem(id: string, oldStudent: StudentModel, newStudent: StudentModel): Promise<void> {
  const currentTimestamp = new Date().toISOString();

  if (id === IS_CREATE_MODE) {
    newStudent.id = getShortUuid();
    newStudent.createdAt = currentTimestamp;
    newStudent.updatedAt = currentTimestamp;

    await simulateAsyncApiCall(null);
    await storageManager.addItem(newStudent);
  } else {
    const changedData = compareObjects(oldStudent, newStudent) as StudentModel;

    if (isObjectEmpty(changedData))
      return;

    changedData.updatedAt = currentTimestamp;

    await simulateAsyncApiCall(null);
    await storageManager.updateItem(id, newStudent, true);
  }
}

export async function deleteStudentItem(id: string): Promise<void> {
  await simulateAsyncApiCall(null);
  await storageManager.deleteItem(id);
}