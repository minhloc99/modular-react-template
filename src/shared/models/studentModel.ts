import { getPropName } from "../services/formPropName.service";
import BaseModel from "./baseModel";

export default interface StudentModel extends BaseModel {
  name?: string;
  email?: string;
}

export function getDefaultStudent(): StudentModel {
  const currentTimestamp = new Date().toISOString();

  return {
    id: "",
    name: "",
    email: "",
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
  };
}

export const getStudentPropName = getPropName<StudentModel>;
