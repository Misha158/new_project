import React, { Dispatch, SetStateAction } from "react";
import type { Ad, Campaign, LineItem } from "../hooks/useFetchTableData";
import { Select } from "../../../shared/components/Select/Select";
import { fetchAll } from "../hooks/useFetchTableData";

const options = [
  { label: "Approved", value: "approved" },
  { label: "Draft", value: "draft" },
  { label: "Ended", value: "ended" },
];

interface Props {
  setAds: Dispatch<SetStateAction<Ad[]>>;
  setCampaigns: Dispatch<SetStateAction<Campaign[]>>;
  setLineItems: Dispatch<SetStateAction<LineItem[]>>;
  selectedCampaignIds: number[];
  selectedLineItemIds: number[];
  setStatus: Dispatch<SetStateAction<string>>;
}

export const Filters = ({ setAds, setCampaigns, setLineItems, setStatus, selectedCampaignIds, selectedLineItemIds }: Props) => {
  const onFilterStatus = async (status: string) => {
    setStatus(status);
    const { campaigns, lineItems, ads } = await fetchAll({ status, selectedCampaignIds, selectedLineItemIds });

    setCampaigns(campaigns);
    setLineItems(lineItems);
    setAds(ads);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Select placeholder="default" label="status" defaultOptions={options} onChange={onFilterStatus} />
    </div>
  );
};
