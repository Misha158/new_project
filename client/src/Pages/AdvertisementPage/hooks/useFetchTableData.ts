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

export const useFetchTableData = ({ selectedCampaignIds, selectedLineItemIds }: Props): Result => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

  const ref = useRef(false);

  useEffect(() => {
    const fetchDada = async () => {
      const campaigns = await axios.get("http://localhost:3000/advertisement/campaigns");
      const lineItems = await axios.get("http://localhost:3000/advertisement/lineItems");
      const ads = await axios.get("http://localhost:3000/advertisement/ads");

      setCampaigns(campaigns.data);
      setLineItems(lineItems.data);
      setAds(ads.data);
    };

    fetchDada();
  }, []);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    }

    const fetchData = async () => {
      const lineItems = await axios.get(`http://localhost:3000/advertisement/lineItems?campaignIds=[${selectedCampaignIds}]`);
      const ads = await axios.get(
        `http://localhost:3000/advertisement/ads?campaignIds=[${selectedCampaignIds}]&lineItemIds=[${selectedLineItemIds}]`
      );

      setLineItems(lineItems.data);
      setAds(ads.data);
    };

    fetchData();
  }, [selectedCampaignIds]);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;
      return;
    }

    const fetchData = async () => {
      const ads = await axios.get(
        `http://localhost:3000/advertisement/ads?campaignIds=[${selectedCampaignIds}]&lineItemIds=[${selectedLineItemIds}]`
      );

      setAds(ads.data);
    };

    fetchData();
  }, [selectedLineItemIds]);

  return {
    campaigns,
    lineItems,
    ads,
  };
};
