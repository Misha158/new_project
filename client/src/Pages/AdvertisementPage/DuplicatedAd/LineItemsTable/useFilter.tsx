import React, { useEffect, useRef, useState } from "react";
import { LineItem } from "../../hooks/useFetchTableData";
import axios from "axios";
import { debounce } from "lodash";

interface Props {
  isModalOpen: boolean;
  lineItems: LineItem[];
}

const useDebounce = (cb: any) => {
  const debounceRef = useRef<((searchValue: string) => Promise<void> | undefined) | null>(null);

  // Создаем debounce функцию с задержкой 1000 миллисекунд (1 секунда) и сохраняем ее в useRef
  if (!debounceRef.current) {
    debounceRef.current = debounce(cb, 1000);
  }

  return { debounceRef };
};

export const useFilter = ({ isModalOpen, lineItems }: Props) => {
  const [value, setValue] = useState("");
  const [filteredLineItems, setFilteredLineItems] = useState<LineItem[]>([]);

  const fetchLineItems = async (searchValue: string) => {
    const { data } = await axios.get(`http://localhost:3000/advertisement/lineItems?search=${searchValue}`);
    setFilteredLineItems(data);
  };

  const { debounceRef } = useDebounce(fetchLineItems);

  useEffect(() => {
    if (isModalOpen) {
      setFilteredLineItems(lineItems);
    }
  }, [isModalOpen]);

  const onSearchFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    // Вызываем debounce функцию с задержкой
    debounceRef.current?.(event.target.value);
  };

  return {
    filteredLineItems,
    onSearchFilter,
    value,
  };
};
