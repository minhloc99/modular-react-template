import { diff } from 'deep-object-diff';

export function compareObjects<T>(oldObject: any, newObject: any): T {
  return diff(oldObject, newObject) as T;
}

export function isObjectEmpty(obj: any): boolean {
  return Object.keys(obj).length === 0;
}