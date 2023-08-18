import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Props } from "./Confirm";
import { Ad } from "../../hooks/useFetchTableData";

interface CreateNewAds {
  closeModal: () => void;
  setError: (value: ((prevState: boolean) => boolean) | boolean) => void;
  data: Partial<Ad>[];
}

const createNewAds = async ({ closeModal, setError, data }: CreateNewAds) => {
  try {
    await axios.post("http://localhost:3000/advertisement/createAds", data);
    message.success("good");
    closeModal();
  } catch (e) {
    message.error(`Error: ${(e as Error).message}`);
    setError(true);
  }
};

export const useConfirm = ({ adNameLineItems, closeModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onConfirm = async () => {
    const data = Object.values(adNameLineItems);

    await setLoading(true);
    await createNewAds({ closeModal, setError, data });
    await setLoading(false);
  };

  return {
    loading,
    error,
    onConfirm,
  };
};
