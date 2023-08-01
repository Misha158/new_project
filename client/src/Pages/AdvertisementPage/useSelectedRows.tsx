import React, { useState } from "react";
import { Entity } from "./useFetchTableData";

export const useSelectedRows = () => {
  const [selectedRows, setSelectedRows] = useState<Entity[]>([]);
  const selectedRowKeys = selectedRows.map((selectedRow) => selectedRow.id);

  const rowSelection = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange: (selectedRowKeys: React.Key[], selectedRows: Entity[]) => {
      setSelectedRows(selectedRows);
    },
    selectedRowKeys,
  };

  const selectRow = (record: Entity) => {
    const isRowAlreadyChecked = selectedRowKeys.includes(record.id);

    if (isRowAlreadyChecked) {
      return setSelectedRows((prev) => prev.filter((row) => row.id !== record.id));
    }

    setSelectedRows((prev) => [...prev, record]);
  };

  const onRow = (record: Entity) => ({
    onClick: () => {
      selectRow(record);
    },
  });

  return {
    onRow,
    rowSelection,
    selectedRows,
  };
};
