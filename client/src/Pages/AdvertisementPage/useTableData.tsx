import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { adColumns, campaignColumns, lineItemColumns } from "./columns/campaign";

export const useTableData = () => {
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

  const tabItems = [
    {
      label: `Campaigns ${campaigns.length}`,
      key: "campaigns",
      children: <Table dataSource={campaigns} columns={campaignColumns} rowKey="id" />,
    },
    {
      label: `Line items ${lineItems.length}`,
      key: "lineItems",
      children: <Table dataSource={lineItems} columns={lineItemColumns} rowKey="id" />,
    },
    {
      label: `Ads ${ads.length}`,
      key: "ads",
      children: <Table dataSource={ads} columns={adColumns} rowKey="id" />,
    },
  ];

  return { campaigns, lineItems, ads, tabItems };
};
