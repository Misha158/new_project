import { useEffect, useState } from "react";
import { Ad, LineItem } from "../../hooks/useFetchTableData";

interface Props {
  selectedLineItemsRows: LineItem[];
  selectedAdRows: Ad[];
}

type AdNameLineItems = Record<string, Partial<Ad>>;

interface GenerateAdNameLineItems {
  selectedLineItemsRows: LineItem[];
  selectedAdRow: Ad;
  prev: AdNameLineItems;
}

const generateAd = ({ campaign_id, id, title, status }) => ({
  line_item_id: id,
  campaign_id,
  title,
  status,
});

const generateAdNameLineItems = ({ prev, selectedLineItemsRows, selectedAdRow }: GenerateAdNameLineItems) =>
  selectedLineItemsRows.reduce<AdNameLineItems>((acc, { id, campaign_id }) => {
    acc[`lineItemId-${id}`] = generateAd({ id, status: selectedAdRow.status, title: selectedAdRow.title, campaign_id });

    return { ...prev, ...acc };
  }, {});

export const useSetAdNameLineItems = ({ selectedLineItemsRows, selectedAdRows }: Props) => {
  const [adNameLineItems, setAdNameLineItems] = useState<AdNameLineItems>({});

  useEffect(() => {
    setAdNameLineItems((prev) => generateAdNameLineItems({ prev, selectedLineItemsRows, selectedAdRow: selectedAdRows[0] }));
  }, [selectedLineItemsRows]);

  return {
    setAdNameLineItems,
    adNameLineItems,
  };
};
