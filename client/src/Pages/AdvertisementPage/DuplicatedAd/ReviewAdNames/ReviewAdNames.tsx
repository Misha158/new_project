import { Dispatch, SetStateAction } from "react";
import { AdInput } from "../AdInput/AdInput";
import { Ad, LineItem } from "../../hooks/useFetchTableData";

interface Props {
  selectedRows: LineItem[];
  selectedAd: Ad;
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Partial<Ad>>>>;
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
