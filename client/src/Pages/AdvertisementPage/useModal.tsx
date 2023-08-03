import { useState, Dispatch, SetStateAction } from "react";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

export const useModal = ({ setStep }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return {
    isModalOpen,
    showModal,
    closeModal,
    handleNext,
    handleBack,
  };
};
