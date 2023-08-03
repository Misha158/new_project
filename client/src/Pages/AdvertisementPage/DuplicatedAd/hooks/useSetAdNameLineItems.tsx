import { useEffect, useState } from "react";
import { Ad, LineItem } from "../../hooks/useFetchTableData";

interface Props {
  selectedLineItemsRows: LineItem[];
  selectedAdRows: Ad[];
}

export const useSetAdNameLineItems = ({ selectedLineItemsRows, selectedAdRows }: Props) => {
  const [adNameLineItems, setAdNameLineItems] = useState<Record<string, Partial<Ad>>>({});

  useEffect(() => {
    setAdNameLineItems((prev) =>
        selectedLineItemsRows.reduce<Record<string, Partial<Ad>>>((acc, currentLi) => {
        acc[`lineItemId-${currentLi.id}`] = {
          campaign_id: currentLi.campaign_id,
          line_item_id: currentLi.id,
          title: selectedAdRows[0].title,
          status: selectedAdRows[0].status,
        };

        return { ...prev, ...acc };
      }, {})
    );
  }, [selectedLineItemsRows]);

  return {
    setAdNameLineItems,
    adNameLineItems,
  };
};
