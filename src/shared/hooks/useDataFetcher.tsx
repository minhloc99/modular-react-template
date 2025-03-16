import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

export default function useDataFetcher<T>(
  loadDataFunc: () => Promise<T>,
  readyToLoad: boolean,
  callbacks?: {
    onSuccess?: (loadedData: T, ...args: any[]) => void,
    onError?: (error: any) => void,
    onFinally?: () => void,
    onUpdateLoading?: (isLoading: boolean) => void
  }
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();

  const loadDebounce = useCallback(debounce(async () => {
    setIsLoading(true);

    if (callbacks?.onUpdateLoading) {
      callbacks.onUpdateLoading(true);
    }

    try {
      const result = await loadDataFunc();

      setData(result);

      if (callbacks?.onSuccess) {
        callbacks.onSuccess(result);
      }

    } catch (error: any) {
      setError(error);

      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    } finally {
      setIsLoading(false);

      if (callbacks?.onUpdateLoading) {
        callbacks.onUpdateLoading(false);
      }

      if (callbacks?.onFinally) {
        callbacks.onFinally();
      }
    }
  }), []);

  useEffect(() => {
    if (readyToLoad) {
      loadDebounce();
    }

    return () => {
      if (callbacks?.onUpdateLoading) {
        callbacks.onUpdateLoading(false);
      }

      setIsLoading(false);
      setData(undefined);
    }
  }, [readyToLoad])


  return {
    isLoading,
    loadDebounce,
    setIsLoading,
    data,
    setData,
    error,
    setError
  };
}