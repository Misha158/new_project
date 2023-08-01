import { useEffect, useState } from "react";
import axios from "axios";

export interface Entity {
  title: string;
  id: number;
  status: string;
}

interface Result {
  campaigns: Entity[];
  lineItems: Entity[];
  ads: Entity[];
}

export const useFetchTableData = (): Result => {
  const [campaigns, setCampaigns] = useState<Entity[]>([]);
  const [lineItems, setLineItems] = useState<Entity[]>([]);
  const [ads, setAds] = useState<Entity[]>([]);

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

  return {
    campaigns,
    lineItems,
    ads,
  };
};
