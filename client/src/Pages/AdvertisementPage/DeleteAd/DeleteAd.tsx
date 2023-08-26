import { Dispatch, SetStateAction } from "react";
import { Button, Modal, Tooltip, Table } from "antd";
import { Ad } from "../hooks/useFetchTableData";
import { useModal } from "../../../shared/hooks/useModal/useModal";
import { generalColumns } from "../columns/campaign";
import { AdvertisementService } from "../../../services/AdvertisementService";

interface Props {
  selectedAdRows: Ad[];
  setAds: Dispatch<SetStateAction<Ad[]>>;
}

export const DeleteAd = ({ selectedAdRows, setAds }: Props) => {
  const { isShow, showModal, closeModal } = useModal();

  const deleteAdsHandler = async () => {
    const deletedAds = await AdvertisementService.deleteAds({ adIds: selectedAdRows.map((ad) => ad.id) });
    const deletedAdIds = deletedAds.map((ad) => ad.id);

    setAds((prev) => prev.filter((ad) => !deletedAdIds.includes(ad.id)));

    closeModal();
  };

  const modalProps = {
    title: "Are you sure to delete this ads?",
    open: isShow,
    onCancel: closeModal,
    okText: "Delete ads",
    footer: [
      <Button key="cancel" onClick={closeModal}>
        Cancel
      </Button>,
      <Button key="delete" type="primary" danger onClick={deleteAdsHandler}>
        Delete
      </Button>,
    ],
  };

  return (
    <>
      <Tooltip title={!selectedAdRows.length ? "Choose an ad to delete" : ""}>
        <Button disabled={!selectedAdRows.length} onClick={showModal}>
          Delete {selectedAdRows.length > 1 ? "ads" : "ad"}
        </Button>
      </Tooltip>

      {isShow && (
        <Modal {...modalProps}>
          <Table dataSource={selectedAdRows} columns={generalColumns} rowKey="id" pagination={false} />
        </Modal>
      )}
    </>
  );
};
