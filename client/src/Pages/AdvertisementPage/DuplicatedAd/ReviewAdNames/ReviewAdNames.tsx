import { Entity } from "../../useFetchTableData";
import { Input } from "antd";
import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";

interface Props {
  selectedRows: Entity[];
  selectedAd: Entity;
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Partial<Entity>>>>;
}

interface Props2 {
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Partial<Entity>>>>;
  selectedAd: Entity;
  lineItem: Entity;
  index: number;
}

export const AdInput = ({ setAdNameLineItems, lineItem, selectedAd, index }: Props2) => {
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

export const ReviewAdNames = ({ selectedRows, setAdNameLineItems, selectedAd }: Props) => {
  return (
    <div>
      {selectedRows.map((selectedLineItemRow, index) => (
        <>
          <div>Line item name: {selectedLineItemRow.title}</div>
          <AdInput setAdNameLineItems={setAdNameLineItems} lineItem={selectedLineItemRow} selectedAd={selectedAd} index={index} />
        </>
      ))}
    </div>
  );
};
