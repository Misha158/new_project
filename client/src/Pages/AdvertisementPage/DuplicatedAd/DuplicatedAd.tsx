import { useState } from "react";
import { Button, Tooltip } from "antd";
import { useSelectedRows } from "../useSelectedRows";
import { useModal } from "../useModal";
import { Entity } from "../useFetchTableData";
import { Modal } from "./Modal/Modal";
import { useSetAdNameLineItems } from "./useSetAdNameLineItems";

interface Props {
  lineItems: Entity[];
  selectedAdRows: Entity[];
}

export const DuplicatedAd = ({ lineItems, selectedAdRows }: Props) => {
  const [step, setStep] = useState(1);
  const { selectedRows, onRow, rowSelection } = useSelectedRows();
  const { showModal, isModalOpen, handleOk, handleCancel } = useModal({ setStep });
  const { setAdNameLineItems } = useSetAdNameLineItems({ selectedRows, selectedAdRows });

  const tooltipText = selectedAdRows.length > 1 ? "Should choose only ONE ad" : "";

  return (
    <>
      <Tooltip title={tooltipText}>
        <Button type="primary" onClick={showModal} disabled={selectedAdRows.length > 1}>
          Duplicate ad
        </Button>
      </Tooltip>

      <Modal
        isModalOpen={isModalOpen}
        lineItems={lineItems}
        handleOk={handleOk}
        handleCancel={handleCancel}
        selectedRows={selectedRows}
        step={step}
        rowSelection={rowSelection}
        onRow={onRow}
        setAdNameLineItems={setAdNameLineItems}
        selectedAdRows={selectedAdRows}
      />
    </>
  );
};
