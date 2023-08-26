import { useState } from "react";

export const useModal = () => {
  const [isShow, setIsShow] = useState(false);

  const showModal = () => {
    setIsShow(true);
  };
  const closeModal = () => {
    setIsShow(false);
  };

  return { isShow, showModal, closeModal };
};
