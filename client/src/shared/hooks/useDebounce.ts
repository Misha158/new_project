import { useRef } from "react";
import { debounce } from "lodash";

export const useDebounce = (cb: any) => {
  const debounceRef = useRef<((searchValue: string) => Promise<void> | undefined) | null>(null);

  // Создаем debounce функцию с задержкой 1000 миллисекунд (1 секунда) и сохраняем ее в useRef
  if (!debounceRef.current) {
    debounceRef.current = debounce(cb, 1000);
  }

  return { debounceRef };
};
