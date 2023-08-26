import { Ad, LineItem } from "../hooks/useFetchTableData";
import { Modal } from "./Modal/Modal";
import { Button, Tooltip } from "antd";
import { useDuplicatedAd } from "../hooks/useDuplicatedAd";

interface Props {
  lineItems: LineItem[];
  selectedAdRows: Ad[];
}

export const DuplicatedAd = ({ lineItems, selectedAdRows }: Props) => {
  const { step, tooltipText, isModalOpen, closeModal, handleNext, handleBack, showModal } = useDuplicatedAd({
    selectedAdRows: selectedAdRows as Ad[],
  });

  return (
    <>
      <Tooltip title={tooltipText}>
        <Button disabled={!selectedAdRows.length || selectedAdRows.length > 1} type="primary" onClick={showModal}>
          Duplicate ad
        </Button>
      </Tooltip>

      {selectedAdRows.length === 1 && (
        <Modal
          isModalOpen={isModalOpen}
          lineItems={lineItems}
          closeModal={closeModal}
          step={step}
          selectedAdRows={selectedAdRows}
          handleNext={handleNext}
          handleBack={handleBack}
        />
      )}
    </>
  );
};
