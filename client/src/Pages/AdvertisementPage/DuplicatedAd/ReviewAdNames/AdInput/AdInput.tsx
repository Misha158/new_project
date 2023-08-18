import { ChangeEvent, useState } from "react";
import { Input } from "antd";
import { Ad, EditedAd, LineItem } from "../../../hooks/useFetchTableData";
import { generateAdNameLineItems, getAdName } from "./utils";

interface Props {
  adNameLineItems: Record<string, Partial<EditedAd>>;
  setAdNameLineItems: (field: string, value: any) => void;
  selectedAd: Ad;
  lineItem: LineItem;
  index: number;
}

export const AdInput = ({ adNameLineItems, setAdNameLineItems, lineItem, selectedAd, index }: Props) => {
  const [value, setValue] = useState(getAdName({ adNameLineItems, lineItem, selectedAd, index }));
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setAdNameLineItems("adNameLineItems", {
      ...adNameLineItems,
      [`lineItemId-${lineItem.id}`]: generateAdNameLineItems({ lineItem, selectedAd, event }),
    });
  };

  return <Input value={value} onChange={onChange} />;
};
