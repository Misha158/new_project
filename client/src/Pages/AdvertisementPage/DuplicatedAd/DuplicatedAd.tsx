import { Ad, LineItem } from "../hooks/useFetchTableData";
import { Modal } from "./Modal/Modal";

interface Props {
  lineItems: LineItem[];
  selectedAdRows: Ad[];
}

export const DuplicatedAd = ({ lineItems, selectedAdRows, isModalOpen, closeModal, step, handleNext, handleBack }: Props) => {
  return (
    <Modal
      isModalOpen={isModalOpen}
      lineItems={lineItems}
      closeModal={closeModal}
      step={step}
      selectedAdRows={selectedAdRows}
      handleNext={handleNext}
      handleBack={handleBack}
    />
  );
};
