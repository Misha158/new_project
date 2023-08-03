import {  Modal as AntModal, Button } from "antd";
import { ReviewAdNames } from "../ReviewAdNames/ReviewAdNames";
import { Ad, LineItem } from "../../hooks/useFetchTableData";
import { Dispatch, SetStateAction } from "react";
import type { TableRowSelection } from "antd/es/table/interface";
import type { GetComponentProps } from "rc-table/lib/interface";
import { Confirm } from "../Confirm/Confirm";
import {LineItemsTable} from "../LineItemsTable/LineItemsTable";
import {useSelectedRows} from "../../hooks/useSelectedRows";
import {useSetAdNameLineItems} from "../hooks/useSetAdNameLineItems";

interface Props {
  lineItems: LineItem[];
  selectedAdRows: Ad[];
  closeModal: () => void;
  handleNext: () => void;
  handleBack: () => void;
  isModalOpen: boolean;
  step: number;
}

export const Modal = ({
  isModalOpen,
  lineItems,
  closeModal,
  step,
  selectedAdRows,
  handleNext,
  handleBack,
}: Props) => {
  const { selectedRows, onRow, rowSelection } = useSelectedRows();
  const { setAdNameLineItems, adNameLineItems } = useSetAdNameLineItems({ selectedRows, selectedAdRows });


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
      <Button key="next" type="primary" onClick={handleNext} disabled={!selectedRows.length}>
        Next
      </Button>,
    ],
  };

  return (
    <AntModal {...modalProps}>
      {step === 1 && ( <LineItemsTable lineItems={lineItems} rowSelection={rowSelection} onRow={onRow}/> )}
      {step === 2 && <ReviewAdNames selectedRows={selectedRows} setAdNameLineItems={setAdNameLineItems} selectedAd={selectedAdRows[0]} />}
      {step === 3 && <Confirm adNameLineItems={adNameLineItems} closeModal={closeModal} />}
    </AntModal>
  );
};
