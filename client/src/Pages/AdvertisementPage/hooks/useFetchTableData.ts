import { useEffect, useRef, useState } from "react";
import axios from "axios";

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
}

interface Props {
  selectedCampaignIds: number[];
  selectedLineItemIds: number[];
}

const fetchAds = async ({ selectedCampaignIds, selectedLineItemIds }) => {
  const ads = await axios.get(`http://localhost:3000/advertisement/ads?campaignIds=[${selectedCampaignIds}]&lineItemIds=[${selectedLineItemIds}]`);

  return ads;
};

const fetchLineItemsAndAds = async ({ selectedCampaignIds, selectedLineItemIds }) => {
  const lineItems = await axios.get(`http://localhost:3000/advertisement/lineItems?campaignIds=[${selectedCampaignIds}]`);
  const ads = await fetchAds({ selectedCampaignIds, selectedLineItemIds });

  return { lineItems, ads };
};

const fetchAll = async () => {
  const campaigns = await axios.get("http://localhost:3000/advertisement/campaigns");
  const lineItems = await axios.get("http://localhost:3000/advertisement/lineItems");
  const ads = await axios.get("http://localhost:3000/advertisement/ads");

  return {
    campaigns,
    lineItems,
    ads,
  };
};

export const useFetchTableData = ({ selectedCampaignIds, selectedLineItemIds }: Props): Result => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  const [oldSelectedCampaignIds, setOldSelectedCampaignIds] = useState(selectedCampaignIds);
  const [oldSelectedLineItemIds, setOldSelectedLineItemIds] = useState(selectedLineItemIds);

  const ref = useRef(false);

  useEffect(() => {
    if (!ref.current) {
      const fetchAllData = async () => {
        const { campaigns, lineItems, ads } = await fetchAll();

        setCampaigns(campaigns.data);
        setLineItems(lineItems.data);
        setAds(ads.data);
      };

      void fetchAllData();

      ref.current = true;
      return;
    }

    if (oldSelectedCampaignIds !== selectedCampaignIds) {
      const { lineItems, ads } = fetchLineItemsAndAds({ selectedLineItemIds, selectedCampaignIds });

      setLineItems(lineItems.data);
      setAds(ads.data);

      setOldSelectedCampaignIds(selectedCampaignIds);
    } else if (oldSelectedCampaignIds === selectedCampaignIds && oldSelectedLineItemIds !== selectedLineItemIds) {
      const ads = fetchAds({ selectedCampaignIds, selectedLineItemIds });

      setAds(ads.data);

      setOldSelectedLineItemIds(selectedLineItemIds);
    }
  }, [selectedCampaignIds, selectedLineItemIds]);

  return {
    campaigns,
    lineItems,
    ads,
  };
};
