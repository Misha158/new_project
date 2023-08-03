import { Input, Table, Modal as AntModal, Button } from "antd";
import { lineItemColumns } from "../../columns/campaign";
import { ReviewAdNames } from "../ReviewAdNames/ReviewAdNames";
import { useFilter } from "./useFilter";
import { Ad, LineItem } from "../../useFetchTableData";
import { Dispatch, SetStateAction } from "react";
import type { TableRowSelection } from "antd/es/table/interface";
import type { GetComponentProps } from "rc-table/lib/interface";
import { Confirm } from "../Confirm/Confirm";

interface Props {
  lineItems: LineItem[];
  selectedRows: LineItem[];
  selectedAdRows: Ad[];
  step: number;
  isModalOpen: boolean;
  closeModal: () => void;
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Partial<Ad>>>>;
  adNameLineItems: Record<string, Partial<Ad>>;
  rowSelection: TableRowSelection<LineItem>;
  onRow: GetComponentProps<LineItem>;
  handleNext: () => void;
  handleBack: () => void;
}

export const Modal = ({
  isModalOpen,
  lineItems,
  closeModal,
  selectedRows,
  step,
  rowSelection,
  onRow,
  setAdNameLineItems,
  selectedAdRows,
  adNameLineItems,
  handleNext,
  handleBack,
}: Props) => {
  const { filteredLineItems, onSearchFilter, value } = useFilter({ lineItems, isModalOpen });

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
      {step === 1 && (
        <>
          <Input value={value} onChange={onSearchFilter} />
          <Table dataSource={filteredLineItems} columns={lineItemColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
        </>
      )}
      {step === 2 && <ReviewAdNames selectedRows={selectedRows} setAdNameLineItems={setAdNameLineItems} selectedAd={selectedAdRows[0]} />}
      {step === 3 && <Confirm adNameLineItems={adNameLineItems} closeModal={closeModal} />}
    </AntModal>
  );
};
