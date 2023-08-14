import { Ad, EditedAd, LineItem } from "../../../hooks/useFetchTableData";
import { ChangeEvent } from "react";

interface GetAdName {
  adNameLineItems: Record<string, Partial<EditedAd>>;
  lineItem: LineItem;
  selectedAd: Ad;
  index: number;
}

interface GenerateAdNameLineItems {
  lineItem: LineItem;
  selectedAd: Ad;
  event: ChangeEvent<HTMLInputElement>;
}

export const getAdName = ({ adNameLineItems, lineItem, selectedAd, index }: GetAdName) => {
  const currentLineItem = adNameLineItems[`lineItemId-${lineItem.id}`];
  const adName = currentLineItem?.editedAdName ? currentLineItem?.editedAdName : `${selectedAd.title}_${index + 1}`;

  return adName;
};

export const generateAdNameLineItems = ({ lineItem, selectedAd, event }: GenerateAdNameLineItems) => ({
  campaign_id: lineItem.campaign_id,
  line_item_id: lineItem.id,
  title: event.target.value,
  status: selectedAd.status,
  editedAdName: event.target.value,
});
