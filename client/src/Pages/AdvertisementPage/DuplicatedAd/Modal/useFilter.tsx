import React, { useEffect, useState } from "react";
import { LineItem } from "../../hooks/useFetchTableData";

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

  const onSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const newFilteredLis = lineItems.filter((li) => {
      if (!event.target.value) return true;

      return (
        String(li.id) === event.target.value ||
        li.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        li.status.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });

    setFilteredLineItems(newFilteredLis);
  };

  return {
    filteredLineItems,
    onSearchFilter,
    value,
  };
};
