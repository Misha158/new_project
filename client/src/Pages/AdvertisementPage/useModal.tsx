import { useState, Dispatch, SetStateAction } from "react";

interface Props {
  setStep: Dispatch<SetStateAction<number>>;
}

export const useModal = ({ setStep }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setStep((prev) => prev + 1);
  };

  const handleCancel = () => {
    setStep((prev) => prev - 1);
  };

  return {
    isModalOpen,
    showModal,
    handleOk,
    handleCancel,
  };
};
