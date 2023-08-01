import { Button, Table } from "antd";
import { adColumns, campaignColumns, lineItemColumns } from "./columns/campaign";
import { useSelectedRows } from "./useSelectedRows";
import { useFetchTableData } from "./useFetchTableData";

interface Props {
  tabName: string;
}

export const useTable = ({ tabName }: Props) => {
  const { campaigns, lineItems, ads } = useFetchTableData();
  const { selectedRowKeys, onRow, rowSelection } = useSelectedRows();

  const isShowDuplicateButton = tabName === "ads" && !!selectedRowKeys.length;

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
      children: (
        <>
          {isShowDuplicateButton && <Button type="primary">Duplicate ad</Button>}
          <Table dataSource={ads} columns={adColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
        </>
      ),
    },
  ];

  return { tabItems };
};
