import { useEffect, useState } from "react";
import axios from "axios";

export const useFetchTableData = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [ads, setAds] = useState([]);

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
