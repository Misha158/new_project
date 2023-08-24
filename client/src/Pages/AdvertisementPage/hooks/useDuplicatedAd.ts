import { useState } from "react";
import { useModal } from "../DuplicatedAd/hooks/useModal";
import { TabNames } from "../../../consts/consts";
import { Ad } from "./useFetchTableData";

interface Props {
  selectedAdRows: Ad[];
  tabName: TabNames;
}

export const useDuplicatedAd = ({ selectedAdRows, tabName }: Props) => {
  const isShowDuplicateButton = tabName === "ads" && !!selectedAdRows.map((selectedAdRow) => selectedAdRow.id).length;

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
    isShowDuplicateButton,
  };
};
