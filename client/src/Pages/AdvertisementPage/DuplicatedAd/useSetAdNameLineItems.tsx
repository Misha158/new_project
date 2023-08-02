import { useEffect, useState } from "react";
import { Entity } from "../useFetchTableData";

interface Props {
  selectedRows: Entity[];
  selectedAdRows: Entity[];
}

export const useSetAdNameLineItems = ({ selectedRows, selectedAdRows }: Props) => {
  const [adNameLineItems, setAdNameLineItems] = useState<Record<string, Entity>>({});

  useEffect(() => {
    setAdNameLineItems((prev) =>
      selectedRows.reduce<Record<string, Entity>>((acc, currentLi) => {
        acc[`lineItemId-${currentLi.id}`] = selectedAdRows[0];

        return { ...prev, ...acc };
      }, {})
    );
  }, [selectedRows]);

  return {
    setAdNameLineItems,
    adNameLineItems,
  };
};
