import { Table } from "antd";
import { adColumns, campaignColumns, lineItemColumns } from "./columns/campaign";
import { useSelectedRows } from "./useSelectedRows";
import { useFetchTableData } from "./useFetchTableData";
import { DuplicatedAd } from "./DuplicatedAd/DuplicatedAd";

interface Props {
  tabName: string;
}

export const useTable = ({ tabName }: Props) => {
  const { campaigns, lineItems, ads } = useFetchTableData();
  const { selectedRows: selectedAdRows, onRow, rowSelection } = useSelectedRows();

  const isShowDuplicateButton = tabName === "ads" && !!selectedAdRows.map((selectedAdRow) => selectedAdRow.id).length;

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
          {isShowDuplicateButton && <DuplicatedAd lineItems={lineItems} selectedAdRows={selectedAdRows} />}
          <Table dataSource={ads} columns={adColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
        </>
      ),
    },
  ];

  return { tabItems };
};
