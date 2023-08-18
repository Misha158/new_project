import { useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";

export const useDebouncedCallback = (callback: () => Promise<void>) => {
  const ref = useRef<() => void>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};
