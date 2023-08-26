import { useState } from "react";
import { useModal } from "../DuplicatedAd/hooks/useModal";
import { TabNames } from "../../../consts/consts";
import { Ad } from "./useFetchTableData";

interface Props {
  selectedAdRows: Ad[];
}

export const useDuplicatedAd = ({ selectedAdRows }: Props) => {
  const [step, setStep] = useState(1);
  const { showModal, isModalOpen, closeModal, handleNext, handleBack } = useModal({ setStep });

  const tooltipText = selectedAdRows.length > 1 ? "Should choose only ONE ad" : "";

  return {
    tooltipText,
    showModal,
    isModalOpen,
    closeModal,
    handleNext,
    handleBack,
    step,
  };
};
