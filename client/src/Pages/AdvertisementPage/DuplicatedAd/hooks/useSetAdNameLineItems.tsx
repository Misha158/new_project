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
}

interface GenerateAd {
  campaign_id: number;
  id: number;
  title: string;
  status: string;
}

const generateAd = ({ campaign_id, id, title, status }: GenerateAd) => ({
  line_item_id: id,
  campaign_id,
  title,
  status,
});

export const generateAdNameLineItems = ({ selectedLineItemsRows, selectedAdRow }: GenerateAdNameLineItems) =>
  selectedLineItemsRows.reduce<AdNameLineItems>((acc, { id, campaign_id }) => {
    acc[`lineItemId-${id}`] = generateAd({ id, status: selectedAdRow.status, title: selectedAdRow.title, campaign_id });

    return { ...acc };
  }, {});

export const useSetAdNameLineItems = ({ selectedLineItemsRows, selectedAdRows }: Props) => {
  const [adNameLineItems, setAdNameLineItems] = useState<AdNameLineItems>({});

  useEffect(() => {
    setAdNameLineItems(() => generateAdNameLineItems({ selectedLineItemsRows, selectedAdRow: selectedAdRows[0] }));
  }, [selectedLineItemsRows]);

  return {
    setAdNameLineItems,
    adNameLineItems,
  };
};
