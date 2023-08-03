import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "antd";
import { Ad, EditedAd, LineItem } from "../../../hooks/useFetchTableData";

interface Props {
  adNameLineItems: Record<string, Partial<EditedAd>>;
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Partial<EditedAd>>>>;
  selectedAd: Ad;
  lineItem: LineItem;
  index: number;
}

export const AdInput = ({ adNameLineItems, setAdNameLineItems, lineItem, selectedAd, index }: Props) => {
  const currentLineItem = adNameLineItems[`lineItemId-${lineItem.id}`];
  const adName = currentLineItem?.editedAdName ? currentLineItem?.editedAdName : `${selectedAd.title}_${index + 1}`;

  const [value, setValue] = useState(adName);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    setAdNameLineItems((prev) => ({
      ...prev,
      [`lineItemId-${lineItem.id}`]: {
        campaign_id: lineItem.campaign_id,
        line_item_id: lineItem.id,
        title: event.target.value,
        status: selectedAd.status,
        editedAdName: event.target.value,
      },
    }));
  };

  return <Input value={value} onChange={onChange} />;
};
