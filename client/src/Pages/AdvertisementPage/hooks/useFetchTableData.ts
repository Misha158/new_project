import { useEffect, useState } from "react";
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

export const useFetchTableData = (): Result => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);

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
    if (firstRender) {
      return skip;
    }
    const lineItems = await axios.get("http://localhost:3000/advertisement/lineItems?campaignIds=[]");
    const ads = await axios.get("http://localhost:3000/advertisement/ads?campaignIds=[]&lineItemIds=[]");

    setLineItems(lineItems.data);
    setAds(ads.data);
  }, [selectedCampaigns]);

  useEffect(() => {
    if (firstRender) {
      return skip;
    }
    const ads = await axios.get("http://localhost:3000/advertisement/ads?campaignIds=[]&lineItemIds=[]");

    setAds(ads.data);
  }, [selectedLineItems]);

  return {
    campaigns,
    lineItems,
    ads,
  };
};
