import axios from "axios";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { LineItem } from "../../hooks/useFetchTableData";

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
    }, 2000) as Function,
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

    fetchLineItems(event.target.value);
  };

  return {
    filteredLineItems,
    onSearchFilter,
    value,
  };
};
