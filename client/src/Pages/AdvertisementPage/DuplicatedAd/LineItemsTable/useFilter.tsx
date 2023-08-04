import React, { useCallback, useEffect, useMemo, useState } from "react";
import { LineItem } from "../../hooks/useFetchTableData";
import axios from "axios";
import { useDebounce } from "../../../../shared/hooks/useDebounce";
import { debounce } from "lodash";

interface Props {
  isModalOpen: boolean;
  lineItems: LineItem[];
}

export const useFilter = ({ isModalOpen, lineItems }: Props) => {
  const [value, setValue] = useState("");
  const [filteredLineItems, setFilteredLineItems] = useState<LineItem[]>([]);

  const fetchLineItems = useCallback(
    debounce(async (searchValue: string) => {
      const { data } = await axios.get(`http://localhost:3000/advertisement/lineItems?search=${searchValue}`);
      setFilteredLineItems(data);
    }, 2000),
    []
  );

  // const { debounceRef } = useDebounce(fetchLineItems);

  useEffect(() => {
    if (isModalOpen) {
      setFilteredLineItems(lineItems);
    }
  }, [isModalOpen]);

  const onSearchFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    // Вызываем debounce функцию с задержкой
    // debounceRef.current?.(event.target.value);
    fetchLineItems(event.target.value);
  };

  return {
    filteredLineItems,
    onSearchFilter,
    value,
  };
};
