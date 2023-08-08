import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { Props } from "./Confirm";

export const useConfirm = ({ adNameLineItems, closeModal }: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onConfirm = async () => {
    const data = Object.values(adNameLineItems);

    await setLoading(true);

    try {
      await axios.post("http://localhost:3000/advertisement/createAds", data);
      message.success("good");
      closeModal();
    } catch (e) {
      message.error(`Error: ${(e as Error).message}`);
      setError(true);
    }
    await setLoading(false);
  };

  return {
    loading,
    error,
    onConfirm,
  };
};
