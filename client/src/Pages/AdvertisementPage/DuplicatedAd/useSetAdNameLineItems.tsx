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
        acc[`lineItemId-${currentLi.id}`] = {
          campaign_id: currentLi.campaign_id,
          line_item_id: currentLi.id,
          title: selectedAdRows[0].title,
          status: selectedAdRows[0].status,
        };

        return { ...prev, ...acc };
      }, {})
    );
  }, [selectedRows]);


  return {
    setAdNameLineItems,
    adNameLineItems,
  };
};
