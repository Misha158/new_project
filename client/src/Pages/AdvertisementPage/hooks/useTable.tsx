import { Button, Table, Tooltip } from "antd";
import { adColumns, campaignColumns, lineItemColumns } from "../columns/campaign";
import { useSelectedRows } from "./useSelectedRows";
import { Ad, useFetchTableData } from "./useFetchTableData";
import { DuplicatedAd } from "../DuplicatedAd/DuplicatedAd";
import { TabNames } from "../../../consts/consts";
import { useMemo } from "react";
import { useDuplicatedAd } from "./useDuplicatedAd";

interface Props {
  tabName: TabNames;
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

  const { step, tooltipText, isModalOpen, isShowDuplicateButton, closeModal, handleNext, handleBack, showModal } = useDuplicatedAd({
    tabName,
    selectedAdRows: selectedAdRows as Ad[],
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
          {isShowDuplicateButton && (
            <DuplicatedAd
              lineItems={lineItems}
              selectedAdRows={selectedAdRows as Ad[]}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              handleNext={handleNext}
              handleBack={handleBack}
              step={step}
            />
          )}
          <Tooltip title={tooltipText}>
            <Button disabled={!selectedAdRows.length || selectedAdRows.length > 1} type="primary" onClick={showModal}>
              Duplicate ad
            </Button>
          </Tooltip>

          <Tooltip title={!selectedAdRows.length ? "Choose an ad to delete" : ""}>
            <Button disabled={!selectedAdRows.length}>Delete {selectedAdRows.length > 1 ? "ads" : "ad"}</Button>
          </Tooltip>

          <Table dataSource={ads} columns={adColumns} rowKey="id" rowSelection={rowSelection} onRow={onRow} />
        </>
      ),
    },
  ];

  return { tabItems };
};
