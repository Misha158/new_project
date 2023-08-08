import { Button, Spin } from "antd";
import { Ad } from "../../hooks/useFetchTableData";
import { useConfirm } from "./useConfirm";

export interface Props {
  adNameLineItems: Record<string, Partial<Ad>>;
  closeModal: () => void;
}

export const Confirm = ({ adNameLineItems, closeModal }: Props) => {
  const { onConfirm, loading, error } = useConfirm({ adNameLineItems, closeModal });

  return (
    <div>
      <Button onClick={onConfirm}>Confirm</Button>
      {loading && <Spin data-testid="antd-spinner" />}
      {error && <div>Some error appear</div>}
    </div>
  );
};
