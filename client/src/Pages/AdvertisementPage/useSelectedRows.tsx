import React, { useState } from "react";

interface DataType {
  id: number;
  title: string;
  status: string;
}

export const useSelectedRows = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(number | string)[]>([]);

  const rowSelection = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, "selectedRows: ", selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

  const selectRow = (record: DataType) => {
    const isRowAlreadyChecked = selectedRowKeys.includes(record.id);

    if (isRowAlreadyChecked) {
      return setSelectedRowKeys((prev) => prev.filter((rowId) => rowId !== record.id));
    }

    setSelectedRowKeys((prev) => [...prev, record.id]);
  };

  const onRow = (record: DataType) => ({
    onClick: () => {
      selectRow(record);
    },
  });

  return {
    onRow,
    rowSelection,
    selectedRowKeys,
  };
};
