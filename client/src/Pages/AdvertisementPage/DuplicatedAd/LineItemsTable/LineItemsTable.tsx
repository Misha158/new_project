import { lineItemColumns } from "../../columns/campaign";
import { useFilter } from "./useFilter";
import { Input, Table } from "antd";
import { LineItem } from "../../hooks/useFetchTableData";
import { TableRowSelection } from "antd/es/table/interface";
import type { GetComponentProps } from "rc-table/lib/interface";

interface Props {
  lineItems: LineItem[];
  rowLineItemSelection: TableRowSelection<LineItem>;
  onLineItemRow: GetComponentProps<LineItem>;
}

export const LineItemsTable = ({ lineItems, rowLineItemSelection, onLineItemRow }: Props) => {
  const { filteredLineItems, onSearchFilter, value } = useFilter({ lineItems, isModalOpen: true });

  return (
    <>
      <Input value={value} onChange={onSearchFilter} />
      <Table dataSource={filteredLineItems} columns={lineItemColumns} rowKey="id" rowSelection={rowLineItemSelection} onRow={onLineItemRow} />
    </>
  );
};
