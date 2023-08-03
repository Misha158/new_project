import { Modal as AntModal, Button } from "antd";
import { ReviewAdNames } from "../ReviewAdNames/ReviewAdNames";
import { Ad, LineItem } from "../../hooks/useFetchTableData";
import { Confirm } from "../Confirm/Confirm";
import { LineItemsTable } from "../LineItemsTable/LineItemsTable";
import { useSelectedRows } from "../../hooks/useSelectedRows";
import { useSetAdNameLineItems } from "../hooks/useSetAdNameLineItems";

interface Props {
  lineItems: LineItem[];
  selectedAdRows: Ad[];
  closeModal: () => void;
  handleNext: () => void;
  handleBack: () => void;
  isModalOpen: boolean;
  step: number;
}

export const Modal = ({ isModalOpen, lineItems, closeModal, step, selectedAdRows, handleNext, handleBack }: Props) => {
  const { selectedRows: selectedLineItemsRows, onRow: onLineItemRow, rowSelection: rowLineItemSelection } = useSelectedRows();
  const { adNameLineItems, setAdNameLineItems } = useSetAdNameLineItems({ selectedLineItemsRows, selectedAdRows });

  const modalProps = {
    title: "Basic Modal",
    open: isModalOpen,
    onCancel: closeModal,
    width: 1000,
    okText: "Next",
    cancelText: "Back",
    footer: [
      <Button key="back" onClick={handleBack} disabled={step === 1}>
        Back
      </Button>,
      <Button key="next" type="primary" onClick={handleNext} disabled={!selectedLineItemsRows.length}>
        Next
      </Button>,
    ],
  };

  return (
    <AntModal {...modalProps}>
      {step === 1 && <LineItemsTable lineItems={lineItems} rowLineItemSelection={rowLineItemSelection} onLineItemRow={onLineItemRow} />}
      {step === 2 && (
        <ReviewAdNames
          adNameLineItems={adNameLineItems}
          selectedLineItemsRows={selectedLineItemsRows}
          setAdNameLineItems={setAdNameLineItems}
          selectedAd={selectedAdRows[0]}
        />
      )}
      {step === 3 && <Confirm adNameLineItems={adNameLineItems} closeModal={closeModal} />}
    </AntModal>
  );
};
