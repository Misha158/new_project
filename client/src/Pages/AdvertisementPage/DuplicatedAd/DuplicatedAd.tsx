import { useState } from "react";
import { Button, Tooltip } from "antd";
import { useSelectedRows } from "../hooks/useSelectedRows";
import { useModal } from "./hooks/useModal";
import { Ad, LineItem } from "../hooks/useFetchTableData";
import { Modal } from "./Modal/Modal";
import { useSetAdNameLineItems } from "./hooks/useSetAdNameLineItems";

interface Props {
  lineItems: LineItem[];
  selectedAdRows: Ad[];
}

export const DuplicatedAd = ({ lineItems, selectedAdRows }: Props) => {
  const [step, setStep] = useState(1);
  const { showModal, isModalOpen, closeModal, handleNext, handleBack } = useModal({ setStep });

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
        step={step}
        selectedAdRows={selectedAdRows}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </>
  );
};
