import { Dispatch, SetStateAction } from "react";
import { AdInput } from "./AdInput/AdInput";
import { Ad, LineItem } from "../../hooks/useFetchTableData";

interface Props {
  selectedLineItemsRows: LineItem[];
  selectedAd: Ad;
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Partial<Ad>>>>;
  adNameLineItems: Record<string, Partial<Ad>>;
}

export const ReviewAdNames = ({ selectedLineItemsRows, setAdNameLineItems, selectedAd, adNameLineItems }: Props) => {
  return (
    <div>
      {selectedLineItemsRows.map((selectedLineItemRow, index) => (
        <div key={selectedLineItemRow.id}>
          <div>Line item name: {selectedLineItemRow.title}</div>
          <AdInput
            adNameLineItems={adNameLineItems}
            setAdNameLineItems={setAdNameLineItems}
            lineItem={selectedLineItemRow}
            selectedAd={selectedAd}
            index={index}
          />
        </div>
      ))}
    </div>
  );
};
