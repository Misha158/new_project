import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Input } from "antd";
import { Entity } from "../../useFetchTableData";

interface Props {
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Partial<Entity>>>>;
  selectedAd: Entity;
  lineItem: Entity;
  index: number;
}

export const AdInput = ({ setAdNameLineItems, lineItem, selectedAd, index }: Props) => {
  const [value, setValue] = useState(`${selectedAd.title}_${index + 1}`);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setAdNameLineItems((prev) => ({
      ...prev,
      [`lineItemId-${lineItem.id}`]: {
        campaign_id: lineItem.campaign_id,
        line_item_id: lineItem.id,
        title: event.target.value,
        status: selectedAd.status,
      },
    }));
  };

  return <Input value={value} onChange={onChange} />;
};
