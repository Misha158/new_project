import { Entity } from "../../useFetchTableData";
import { Input } from "antd";
import { useState } from "react";

interface Props {
  selectedRows: Entity[];
}

export const AdInput = () => {
  const [value, setValue] = useState("");

  return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const ReviewAdNames = ({ selectedRows }: Props) => {
  return (
    <div>
      ReviewAdNames
      <div>
        {selectedRows.map((selectedRow) => (
          <>
            <div>Line item name: {selectedRow.title}</div>
            <AdInput />
          </>
        ))}
      </div>
    </div>
  );
};
