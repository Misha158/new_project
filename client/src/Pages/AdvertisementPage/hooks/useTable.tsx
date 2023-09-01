import { Table } from "antd";
import { adColumns, campaignColumns, lineItemColumns } from "../columns/campaign";
import { useSelectedRows } from "./useSelectedRows";
import { Ad, Campaign, LineItem, useFetchTableData } from "./useFetchTableData";
import { DuplicatedAd } from "../DuplicatedAd/DuplicatedAd";
import { TabNames } from "../../../consts/consts";
import { useMemo } from "react";
import { DeleteAd } from "../DeleteAd/DeleteAd";

interface Props {
  tabName: TabNames;
}

export const useTable = ({ tabName }: Props) => {
  const { selectedRows: selectedLineItemRows, onRow: onLineItemRow, rowSelection: lineItemRowSelection } = useSelectedRows<LineItem>();
  const { selectedRows: selectedCampaignRows, onRow: onCampaignRow, rowSelection: campaignRowSelection } = useSelectedRows<Campaign>();
  const { selectedRows: selectedAdRows, onRow, rowSelection } = useSelectedRows<Ad>();

  const selectedLineItemIds = useMemo(() => selectedLineItemRows.map((lineItem) => lineItem.id), [selectedLineItemRows]);
  const selectedCampaignIds = useMemo(() => selectedCampaignRows.map((lineItem) => lineItem.id), [selectedCampaignRows]);

  const { campaigns, lineItems, ads, setAds, setCampaigns, setLineItems } = useFetchTableData({
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
          <DuplicatedAd lineItems={lineItems} selectedAdRows={selectedAdRows} />
          <DeleteAd selectedAdRows={selectedAdRows} setAds={setAds} />

          <Table dataSource={ads} columns={adColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
        </>
      ),
    },
  ];

  return { tabItems, setAds, setCampaigns, setLineItems };
};
