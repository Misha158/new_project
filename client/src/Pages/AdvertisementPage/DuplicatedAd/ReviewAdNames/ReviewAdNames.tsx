import { Entity } from "../../useFetchTableData";
import { Input } from "antd";
import { useState } from "react";

interface Props {
  selectedRows: Entity[];
}

interface Props2 {
    setAdNameLineItems: any;
    lineItemId: number;
}

export const AdInput = ({setAdNameLineItems, lineItemId}: Props2) => {
  const [value, setValue] = useState("ORIGINAL AD NAME + GENERATED INCREMENT");

  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
};

// pass original ad name
// generate new ad name increment
// save it to some state


export const ReviewAdNames = ({ selectedRows, setAdNameLineItems }: Props) => {
  return (
    <div>
      ReviewAdNames
      <div>
        {selectedRows.map((selectedRow) => (
          <>
            <div>Line item name: {selectedRow.title}</div>
            <AdInput setAdNameLineItems={setAdNameLineItems} lineItemId={selectedRow.id} />
          </>
        ))}
      </div>
    </div>
  );
};
