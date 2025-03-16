export function getPropName<T>(prop: keyof T): string {
  return prop.toString();
}