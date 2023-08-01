import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Table } from "antd";
import { lineItemColumns } from "../columns/campaign";
import { useSelectedRows } from "../useSelectedRows";
import { useModal } from "../useModal";
import { Entity } from "../useFetchTableData";
import { ReviewAdNames } from "./ReviewAdNames/ReviewAdNames";

interface Props {
  lineItems: Entity[];
}

export const DuplicatedAd = ({ lineItems }: Props) => {
  const [step, setStep] = useState(1);
  const { selectedRows, onRow, rowSelection } = useSelectedRows();
  const { showModal, isModalOpen, handleOk, handleCancel } = useModal({ setStep });
  const [value, setValue] = useState("");
  const [filteredLi, setFilteredLi] = useState<Entity[]>([]);

  const onSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const newFilteredLis = lineItems.filter((li) => {
      if (!event.target.value) return true;

      return (
        String(li.id) === event.target.value ||
        li.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        li.status.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });

    setFilteredLi(newFilteredLis);
  };

  useEffect(() => {
    if (isModalOpen) {
      setFilteredLi(lineItems);
    }
  }, [isModalOpen]);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Duplicate ad
      </Button>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000} okText="Next" cancelText="Back">
        {step === 1 && (
          <>
            <Input value={value} onChange={onSearchFilter} />
            <Table dataSource={filteredLi} columns={lineItemColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
          </>
        )}
        {step === 2 && <ReviewAdNames selectedRows={selectedRows} />}
        {/*{step === 3 && <ReviewAdNames />}*/}
      </Modal>
    </>
  );
};
