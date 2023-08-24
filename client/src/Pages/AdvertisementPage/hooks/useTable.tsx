import { Table } from "antd";
import { adColumns, campaignColumns, lineItemColumns } from "../columns/campaign";
import { useSelectedRows } from "./useSelectedRows";
import { Ad, useFetchTableData } from "./useFetchTableData";
import { DuplicatedAd } from "../DuplicatedAd/DuplicatedAd";
import { TabNames } from "../../../consts/consts";
import { useMemo } from "react";
import { DeleteAd } from "../DeleteAd/DeleteAd";

interface Props {
  tabName: TabNames;
}

export const useTable = ({ tabName }: Props) => {
  const { selectedRows: selectedLineItemRows, onRow: onLineItemRow, rowSelection: lineItemRowSelection } = useSelectedRows();
  const { selectedRows: selectedCampaignRows, onRow: onCampaignRow, rowSelection: campaignRowSelection } = useSelectedRows();
  const { selectedRows: selectedAdRows, onRow, rowSelection } = useSelectedRows();

  const selectedLineItemIds = useMemo(() => selectedLineItemRows.map((lineItem) => lineItem.id), [selectedLineItemRows]);
  const selectedCampaignIds = useMemo(() => selectedCampaignRows.map((lineItem) => lineItem.id), [selectedCampaignRows]);

  const { campaigns, lineItems, ads } = useFetchTableData({
    selectedLineItemIds,
    selectedCampaignIds,
  });

  const tabItems = [
    {
      label: `Campaigns ${campaigns.length}`,
      key: TabNames.Campaigns,
      children: <Table dataSource={campaigns} columns={campaignColumns} rowKey="id" rowSelection={campaignRowSelection} onRow={onCampaignRow} />,
    },
    {
      label: `Line items ${lineItems.length}`,
      key: TabNames.LineItems,
      children: <Table dataSource={lineItems} columns={lineItemColumns} rowKey="id" rowSelection={lineItemRowSelection} onRow={onLineItemRow} />,
    },
    {
      label: `Ads ${ads.length}`,
      key: TabNames.Ads,
      children: (
        <>
          <DuplicatedAd lineItems={lineItems} selectedAdRows={selectedAdRows as Ad[]} />
          <DeleteAd selectedAdRows={selectedAdRows} />

          <Table dataSource={ads} columns={adColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
        </>
      ),
    },
  ];

  return { tabItems };
};
