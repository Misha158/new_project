import { Table } from "antd";
import { adColumns, campaignColumns, lineItemColumns } from "../columns/campaign";
import { useSelectedRows } from "./useSelectedRows";
import { Ad, useFetchTableData } from "./useFetchTableData";
import { DuplicatedAd } from "../DuplicatedAd/DuplicatedAd";
import { useMemo } from "react";

interface Props {
  tabName: string;
}

export const useTable = ({ tabName }: Props) => {
  const { selectedRows: selectedLineItemRows, onRow: onLineItemRow, rowSelection: lineItemRowSelection } = useSelectedRows();
  const { selectedRows: selectedCampaignRows, onRow: onCampaignRow, rowSelection: campaignRowSelection } = useSelectedRows();

  const selectedLineItemIds = useMemo(() => selectedLineItemRows.map((lineItem) => lineItem.id), [selectedLineItemRows]);
  const selectedCampaignIds = useMemo(() => selectedCampaignRows.map((lineItem) => lineItem.id), [selectedCampaignRows]);

  const { campaigns, lineItems, ads } = useFetchTableData({
    selectedLineItemIds,
    selectedCampaignIds,
  });

  const { selectedRows: selectedAdRows, onRow, rowSelection } = useSelectedRows();

  const isShowDuplicateButton = tabName === "ads" && !!selectedAdRows.map((selectedAdRow) => selectedAdRow.id).length;

  const tabItems = [
    {
      label: `Campaigns ${campaigns.length}`,
      key: "campaigns",
      children: <Table dataSource={campaigns} columns={campaignColumns} rowKey="id" rowSelection={campaignRowSelection} onRow={onCampaignRow} />,
    },
    {
      label: `Line items ${lineItems.length}`,
      key: "lineItems",
      children: <Table dataSource={lineItems} columns={lineItemColumns} rowKey="id" rowSelection={lineItemRowSelection} onRow={onLineItemRow} />,
    },
    {
      label: `Ads ${ads.length}`,
      key: "ads",
      children: (
        <>
          {isShowDuplicateButton && <DuplicatedAd lineItems={lineItems} selectedAdRows={selectedAdRows as Ad[]} />}
          <Table dataSource={ads} columns={adColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
        </>
      ),
    },
  ];

  return { tabItems };
};
