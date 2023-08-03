import { useState } from "react";
import { Button, Tooltip } from "antd";
import { useSelectedRows } from "../useSelectedRows";
import { useModal } from "../useModal";
import { Ad, LineItem } from "../useFetchTableData";
import { Modal } from "./Modal/Modal";
import { useSetAdNameLineItems } from "./useSetAdNameLineItems";

interface Props {
  lineItems: LineItem[];
  selectedAdRows: Ad[];
}

export const DuplicatedAd = ({ lineItems, selectedAdRows }: Props) => {
  const [step, setStep] = useState(1);
  const { selectedRows, onRow, rowSelection } = useSelectedRows();
  const { showModal, isModalOpen, closeModal, handleNext, handleBack } = useModal({ setStep });
  const { setAdNameLineItems, adNameLineItems } = useSetAdNameLineItems({ selectedRows, selectedAdRows });

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
        closeModal={closeModal}
        selectedRows={selectedRows}
        step={step}
        rowSelection={rowSelection}
        onRow={onRow}
        setAdNameLineItems={setAdNameLineItems}
        selectedAdRows={selectedAdRows}
        adNameLineItems={adNameLineItems}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </>
  );
};
