import { Button } from "antd";
import axios from "axios";
import { Ad } from "../../hooks/useFetchTableData";

interface Props {
  adNameLineItems: Record<string, Partial<Ad>>;
  closeModal: () => void;
}

export const Confirm = ({ adNameLineItems, closeModal }: Props) => {
  const onConfirm = async () => {
    const data = Object.values(adNameLineItems);
    await axios.post("http://localhost:3000/advertisement/createAds", data);
    closeModal();
  };

  return (
    <div>
      <Button onClick={onConfirm}>Confirm</Button>
    </div>
  );
};
