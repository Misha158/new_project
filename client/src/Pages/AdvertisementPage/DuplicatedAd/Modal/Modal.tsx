import React, { useEffect, useState } from "react";
import { Input, Table, Modal as AntModal } from "antd";
import { lineItemColumns } from "../../columns/campaign";
import { ReviewAdNames } from "../ReviewAdNames/ReviewAdNames";
import { Entity } from "../../useFetchTableData";

export const Modal = ({
  isModalOpen,
  lineItems,
  handleOk,
  handleCancel,
  selectedRows,
  step,
  rowSelection,
  onRow,
  setAdNameLineItems,
  selectedAdRows,
}: any) => {
  const [value, setValue] = useState("");
  const [filteredLi, setFilteredLi] = useState<Entity[]>([]);

  useEffect(() => {
    if (isModalOpen) {
      setFilteredLi(lineItems);
    }
  }, [isModalOpen]);

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

  return (
    <AntModal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={1000}
      okText="Next"
      cancelText="Back"
      okButtonProps={{
        disabled: !selectedRows.length,
      }}
      cancelButtonProps={{
        disabled: step === 1,
      }}
    >
      {step === 1 && (
        <>
          <Input value={value} onChange={onSearchFilter} />
          <Table dataSource={filteredLi} columns={lineItemColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
        </>
      )}
      {step === 2 && <ReviewAdNames selectedRows={selectedRows} setAdNameLineItems={setAdNameLineItems} selectedAd={selectedAdRows[0]} />}
      {/*{step === 3 && <ReviewAdNames />}*/}
    </AntModal>
  );
};
