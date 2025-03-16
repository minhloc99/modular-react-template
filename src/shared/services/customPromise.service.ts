import { setCustomTimeout } from "./timeout.service";

export async function simulateAsyncApiCall<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setCustomTimeout(() => {
      resolve(data);
    });
  });
}