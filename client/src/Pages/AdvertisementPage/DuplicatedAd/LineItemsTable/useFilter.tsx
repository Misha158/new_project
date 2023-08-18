import axios from "axios";
// import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { LineItem } from "../../hooks/useFetchTableData";
import { useDebouncedCallback } from "../../../../shared/hooks/useDebouncedCallback";

interface Props {
  isModalOpen: boolean;
  lineItems: LineItem[];
}

export const useFilter = ({ isModalOpen, lineItems }: Props) => {
  const [value, setValue] = useState("");
  const [filteredLineItems, setFilteredLineItems] = useState<LineItem[]>([]);

  const fetchItems = async (value: string) => {
    const { data } = await axios.get(`http://localhost:3000/advertisement/lineItems?search=${value}`);
    setFilteredLineItems(data);
  };

  const debouncedFetcher = useDebouncedCallback(() => fetchItems(value));

  useEffect(() => {
    if (isModalOpen) {
      setFilteredLineItems(lineItems);
    }
  }, [isModalOpen]);

  const onSearchFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    debouncedFetcher();
  };

  return {
    filteredLineItems,
    onSearchFilter,
    value,
  };
};
