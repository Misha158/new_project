import { useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";

export const useDebouncedCallback = (callback: (value: any) => Promise<void>) => {
  const ref = useRef<(value: any) => Promise<void>>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = (value) => {
      return new Promise((resolve) => {
        ref.current?.(value).then(() => {
          resolve(); // Разрешить обещание после выполнения колбэка
        });
      });
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};
