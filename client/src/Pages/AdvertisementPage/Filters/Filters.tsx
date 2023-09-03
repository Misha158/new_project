import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import type { Ad, Campaign, LineItem } from "../hooks/useFetchTableData";
import { Select } from "../../../shared/components/Select/Select";
import { fetchAll } from "../hooks/useFetchTableData";
import { DebouncedInput } from "../../../shared/components/DebouncedInput/DebouncedInput";

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
  setStatus: Dispatch<SetStateAction<string | undefined>>;
  status?: string;
}

interface FetchAndSaveData {
  status?: string;
  search?: string;
  selectedCampaignIds: number[];
  selectedLineItemIds: number[];
  setAds: Dispatch<SetStateAction<Ad[]>>;
  setCampaigns: Dispatch<SetStateAction<Campaign[]>>;
  setLineItems: Dispatch<SetStateAction<LineItem[]>>;
}

const fetchAndSaveData = async ({
  status,
  search,
  selectedCampaignIds,
  selectedLineItemIds,
  setCampaigns,
  setLineItems,
  setAds,
}: FetchAndSaveData) => {
  const { campaigns, lineItems, ads } = await fetchAll({ search, status, selectedCampaignIds, selectedLineItemIds });

  setCampaigns(campaigns);
  setLineItems(lineItems);
  setAds(ads);
};

export const Filters = ({ setAds, setCampaigns, setLineItems, setStatus, selectedCampaignIds, selectedLineItemIds, status }: Props) => {
  const [search, setSearch] = useState("");
  const onFilterStatus = async (status: string) => {
    setStatus(status);
    await fetchAndSaveData({ search, status, selectedCampaignIds, selectedLineItemIds, setCampaigns, setLineItems, setAds });
  };

  const onInputSearch = useCallback(
    async (search: string) => {
      setSearch(search);
      await fetchAndSaveData({ status, search, selectedCampaignIds, selectedLineItemIds, setCampaigns, setLineItems, setAds });
    },
    [selectedCampaignIds, selectedLineItemIds, status]
  );

  return (
    <div style={{ marginBottom: "10px" }}>
      <DebouncedInput onChange={onInputSearch} />
      <Select placeholder="default" label="status" defaultOptions={options} onChange={onFilterStatus} />
    </div>
  );
};
