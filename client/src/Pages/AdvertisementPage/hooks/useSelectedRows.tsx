import React, { useState } from "react";
import { Ad, Campaign, LineItem } from "./useFetchTableData";

interface Props {
  setFieldValue?: (id: number) => void;
}

export const useSelectedRows = ({ setFieldValue } = {} as Props) => {
  const [selectedRows, setSelectedRows] = useState<(Campaign | LineItem | Ad)[]>([]);
  const selectedRowKeys = selectedRows.map((selectedRow) => selectedRow.id);

  const rowSelection = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange: (selectedRowKeys: React.Key[], selectedRows: Campaign[] | LineItem[] | Ad[]) => {
      setSelectedRows(selectedRows);
    },
    selectedRowKeys,
  };

  const selectRow = (record: Campaign | LineItem | Ad) => {
    const isRowAlreadyChecked = selectedRowKeys.includes(record.id);

    if (isRowAlreadyChecked) {
      return setSelectedRows((prev) => prev.filter((row) => row.id !== record.id));
    }

    setSelectedRows((prev) => [...prev, record]);
  };

  const onRow = (record: Campaign | LineItem | Ad) => ({
    onClick: () => {
      selectRow(record);
      setFieldValue?.(record.id);
    },
  });

  return {
    onRow,
    rowSelection,
    selectedRows,
  };
};
