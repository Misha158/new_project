import { ChangeEvent } from "react";
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
  const adTitle = getAdName({ adNameLineItems, lineItem, selectedAd, index });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAdNameLineItems("adNameLineItems", {
      ...adNameLineItems,
      [`lineItemId-${lineItem.id}`]: generateAdNameLineItems({ lineItem, selectedAd, event }),
    });
  };

  return <Input value={adTitle} onChange={onChange} />;
};
