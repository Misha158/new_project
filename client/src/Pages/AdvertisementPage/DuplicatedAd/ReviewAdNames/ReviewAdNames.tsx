import { Dispatch, SetStateAction } from "react";
import { AdInput } from "../AdInput/AdInput";
import { Entity } from "../../useFetchTableData";

interface Props {
  selectedRows: Entity[];
  selectedAd: Entity;
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Partial<Entity>>>>;
}

export const ReviewAdNames = ({ selectedRows, setAdNameLineItems, selectedAd }: Props) => {
  return (
    <div>
      {selectedRows.map((selectedLineItemRow, index) => (
        <div key={selectedLineItemRow.id}>
          <div>Line item name: {selectedLineItemRow.title}</div>
          <AdInput setAdNameLineItems={setAdNameLineItems} lineItem={selectedLineItemRow} selectedAd={selectedAd} index={index} />
        </div>
      ))}
    </div>
  );
};
