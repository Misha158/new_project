import React, { useState } from "react";
import { Ad, LineItem } from "./useFetchTableData";

export const useSelectedRows = () => {
  const [selectedRows, setSelectedRows] = useState<(Ad | LineItem)[]>([]);
  const selectedRowKeys = selectedRows.map((selectedRow) => selectedRow.id);

  const rowSelection = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange: (selectedRowKeys: React.Key[], selectedRows: LineItem[]) => {
      setSelectedRows(selectedRows);
    },
    selectedRowKeys,
  };

  const selectRow = (record: Ad | LineItem) => {
    const isRowAlreadyChecked = selectedRowKeys.includes(record.id);

    if (isRowAlreadyChecked) {
      return setSelectedRows((prev) => prev.filter((row) => row.id !== record.id));
    }

    setSelectedRows((prev) => [...prev, record]);
  };

  const onRow = (record: Ad | LineItem) => ({
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
