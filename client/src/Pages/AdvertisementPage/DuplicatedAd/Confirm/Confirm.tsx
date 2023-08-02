import { Entity } from "../../useFetchTableData";
import { Button } from "antd";
import axios from "axios";

interface Props {
  adNameLineItems: Record<string, Entity>;
}

export const Confirm = ({ adNameLineItems }: Props) => {
  console.log("data", Object.values(adNameLineItems));

  const onConfirm = async () => {
    const data = Object.values(adNameLineItems);
    await axios.post("http://localhost:3000/advertisement/createAds", data);
  };

  return (
    <div>
      <Button onClick={onConfirm}>Confirm</Button>
    </div>
  );
};
