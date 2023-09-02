import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AdvertisementService } from "../../../services/AdvertisementService";

export interface Entity {
  title: string;
  id: number;
  status: string;
}

export interface Campaign extends Entity {
  title: string;
  id: number;
  status: string;
}

export interface LineItem extends Entity {
  campaign_id: number;
}

export interface Ad extends Entity {
  campaign_id: number;
  line_item_id: number;
}

export interface EditedAd extends Ad {
  editedAdName?: string;
}

interface Result {
  campaigns: Campaign[];
  lineItems: LineItem[];
  ads: Ad[];
  setAds: Dispatch<SetStateAction<Ad[]>>;
  setCampaigns: Dispatch<SetStateAction<Campaign[]>>;
  setLineItems: Dispatch<SetStateAction<LineItem[]>>;
}

interface Props {
  selectedCampaignIds: number[];
  selectedLineItemIds: number[];
}

export const fetchAll = async ({ status, selectedLineItemIds, selectedCampaignIds }: FetchAllData) => {
  const campaigns = await AdvertisementService.getCampaigns({ status });
  const lineItems = await AdvertisementService.getLineItems({ status, selectedCampaignIds });
  const ads = await AdvertisementService.getAds({ status, selectedCampaignIds, selectedLineItemIds });

  return {
    campaigns,
    lineItems,
    ads,
  };
};

export interface FetchAllData {
  status?: string;
  selectedCampaignIds?: number[];
  selectedLineItemIds?: number[];
}

export const useFetchTableData = ({ selectedCampaignIds, selectedLineItemIds }: Props): Result => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  const refOldSelectedCampaignIds = useRef(selectedCampaignIds);
  const refOldSelectedLineItemIds = useRef(selectedLineItemIds);

  const ref = useRef(false);

  const fetchAllData = async ({ status, selectedLineItemIds, selectedCampaignIds }: FetchAllData) => {
    const filterOptions = {
      ...(status ? { status } : {}),
      ...(selectedLineItemIds?.length ? { selectedLineItemIds } : {}),
      ...(selectedCampaignIds?.length ? { selectedCampaignIds } : {}),
    };

    const { campaigns, lineItems, ads } = await fetchAll(filterOptions);

    setCampaigns(campaigns);
    setLineItems(lineItems);
    setAds(ads);
  };

  const fetchOnlyAds = async () => {
    const ads = await AdvertisementService.getAds({ selectedCampaignIds, selectedLineItemIds });

    setAds(ads);
    refOldSelectedLineItemIds.current = selectedLineItemIds;
  };

  const fetchLineItemsAndAds = async ({
    selectedCampaignIds,
    selectedLineItemIds,
  }: {
    selectedCampaignIds: number[];
    selectedLineItemIds: number[];
  }) => {
    const lineItems = await AdvertisementService.getLineItems({ selectedCampaignIds });
    const ads = await AdvertisementService.getAds({ selectedCampaignIds, selectedLineItemIds });

    setLineItems(lineItems);
    setAds(ads);
    refOldSelectedCampaignIds.current = selectedCampaignIds;
  };

  useEffect(() => {
    if (!ref.current) {
      void fetchAllData({});

      ref.current = true;
      return;
    }

    if (refOldSelectedCampaignIds.current !== selectedCampaignIds) {
      void fetchLineItemsAndAds({ selectedCampaignIds, selectedLineItemIds });
      return;
    } else if (refOldSelectedCampaignIds.current === selectedCampaignIds && refOldSelectedLineItemIds.current !== selectedLineItemIds) {
      void fetchOnlyAds();
      return;
    }

    fetchAllData({ status, selectedCampaignIds, selectedLineItemIds });
  }, [selectedCampaignIds, selectedLineItemIds]);

  return {
    campaigns,
    lineItems,
    ads,
    setAds,
    setCampaigns,
    setLineItems,
  };
};
