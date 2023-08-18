import { AdInput } from "./AdInput/AdInput";
import { Ad, EditedAd, LineItem } from "../../hooks/useFetchTableData";

interface Props {
  selectedLineItemsRows: LineItem[];
  selectedAd: Ad;
  setAdNameLineItems: (field: string, value: any) => void;
  adNameLineItems: Record<string, Partial<EditedAd>>;
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
