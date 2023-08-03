import React, { useEffect, useState } from "react";
import { LineItem } from "../../hooks/useFetchTableData";
import axios from "axios";

interface Props {
  isModalOpen: boolean;
  lineItems: LineItem[];
}

export const useFilter = ({ isModalOpen, lineItems }: Props) => {
  const [value, setValue] = useState("");
  const [filteredLineItems, setFilteredLineItems] = useState<LineItem[]>([]);

  useEffect(() => {
    if (isModalOpen) {
      setFilteredLineItems(lineItems);
    }
  }, [isModalOpen]);

  const onSearchFilter = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    const { data } = await axios.get(`http://localhost:3000/advertisement/lineItems?search=${event.target.value}`);

    setFilteredLineItems(data);
  };

  return {
    filteredLineItems,
    onSearchFilter,
    value,
  };
};
