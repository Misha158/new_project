import { Input, Table, Modal as AntModal } from "antd";
import { lineItemColumns } from "../../columns/campaign";
import { ReviewAdNames } from "../ReviewAdNames/ReviewAdNames";
import { useFilter } from "./useFilter";
import { Entity } from "../../useFetchTableData";
import { Dispatch, SetStateAction } from "react";
import type { TableRowSelection } from "antd/es/table/interface";
import type { GetComponentProps } from "rc-table/lib/interface";

interface Props {
  lineItems: Entity[];
  selectedRows: Entity[];
  selectedAdRows: Entity[];
  step: number;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  setAdNameLineItems: Dispatch<SetStateAction<Record<string, Entity>>>;
  rowSelection: TableRowSelection<Entity>;
  onRow: GetComponentProps<Entity>;
}

export const Modal = ({
  isModalOpen,
  lineItems,
  handleOk,
  handleCancel,
  selectedRows,
  step,
  rowSelection,
  onRow,
  setAdNameLineItems,
  selectedAdRows,
}: Props) => {
  const { filteredLineItems, onSearchFilter, value } = useFilter({ lineItems, isModalOpen });

  const modalProps = {
    title: "Basic Modal",
    open: isModalOpen,
    onOk: handleOk,
    onCancel: handleCancel,
    width: 1000,
    okText: "Next",
    cancelText: "Back",
    okButtonProps: {
      disabled: !selectedRows.length,
    },
    cancelButtonProps: {
      disabled: step === 1,
    },
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
      {/*{step === 3 && <ReviewAdNames />}*/}
    </AntModal>
  );
};
