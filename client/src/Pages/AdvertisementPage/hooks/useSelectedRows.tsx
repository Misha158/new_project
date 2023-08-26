import React, { useState } from "react";
import { Ad, Campaign, LineItem } from "./useFetchTableData";

interface Props {
  setFieldValue?: (id: number) => void;
}

type Entity = Campaign | LineItem | Ad;

export const useSelectedRows = <T extends Entity>({ setFieldValue } = {} as Props) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const selectedRowKeys = selectedRows.map((selectedRow) => selectedRow.id);

  const rowSelection = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
      setSelectedRows(selectedRows);
    },
    selectedRowKeys,
  };

  const selectRow = (record: T) => {
    const isRowAlreadyChecked = selectedRowKeys.includes(record.id);

    if (isRowAlreadyChecked) {
      return setSelectedRows((prev) => prev.filter((row) => row.id !== record.id));
    }

    setSelectedRows((prev) => [...prev, record]);
  };

  const onRow = (record: T) => ({
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
