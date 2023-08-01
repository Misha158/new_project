import { Table } from "antd";
import { adColumns, campaignColumns, lineItemColumns } from "./columns/campaign";
import { useSelectedRows } from "./useSelectedRows";
import { useFetchTableData } from "./useFetchTableData";

export const useTable = () => {
  const { campaigns, lineItems, ads } = useFetchTableData();
  const { onRow, rowSelection } = useSelectedRows();

  const tabItems = [
    {
      label: `Campaigns ${campaigns.length}`,
      key: "campaigns",
      children: <Table dataSource={campaigns} columns={campaignColumns} rowKey="id" />,
    },
    {
      label: `Line items ${lineItems.length}`,
      key: "lineItems",
      children: <Table dataSource={lineItems} columns={lineItemColumns} rowKey="id" />,
    },
    {
      label: `Ads ${ads.length}`,
      key: "ads",
      children: <Table dataSource={ads} columns={adColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />,
    },
  ];

  return { tabItems };
};
