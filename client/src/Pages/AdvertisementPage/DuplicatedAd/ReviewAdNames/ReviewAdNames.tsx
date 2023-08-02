import { Entity } from "../../useFetchTableData";
import { Input } from "antd";
import { useState, Dispatch, SetStateAction, ChangeEvent } from "react";

interface Props {
  selectedRows: Entity[];
  selectedAd: Entity;
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Entity>>>;
}

interface Props2 {
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Entity>>>;
  selectedAd: Entity;
  lineItemId: number;
  index: number;
}

export const AdInput = ({ setAdNameLineItems, lineItemId, selectedAd, index }: Props2) => {
  const [value, setValue] = useState(`${selectedAd.title}_${index + 1}`);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setAdNameLineItems((prev) => ({
      ...prev,
      [`lineItemId-${lineItemId}`]: {
        ...selectedAd,
        title: event.target.value,
      },
    }));
  };

  return <Input value={value} onChange={onChange} />;
};

export const ReviewAdNames = ({ selectedRows, setAdNameLineItems, selectedAd }: Props) => {
  return (
    <div>
      {selectedRows.map((selectedRow, index) => (
        <>
          <div>Line item name: {selectedRow.title}</div>
          <AdInput setAdNameLineItems={setAdNameLineItems} lineItemId={selectedRow.id} selectedAd={selectedAd} index={index} />
        </>
      ))}
    </div>
  );
};
