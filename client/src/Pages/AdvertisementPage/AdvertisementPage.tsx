import React, { useEffect, useState } from "react";
import { Table, Tabs } from "antd";
import { adColumns, campaignColumns, lineItemColumns } from "./columns/campaign";

const onChange = (key: string) => {
  console.log(key);
};

export const AdvertisementPage = () => {
  const [camps, setCamps] = useState([]);
  const [li, setLi] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchDada = async () => {
      setCamps([
        {
          title: "Campaign",
          id: 1,
          status: "active",
          lineItemId: 1,
        },
      ]);
      setLi([
        {
          title: "Line Item ",
          id: 1,
          status: "active",
          campaignId: 1,
          adId: 1,
        },
      ]);
      setAds([
        {
          title: "Ad",
          id: 1,
          status: "active",
          lineItemId: 1,
          campaignId: 1,
        },
      ]);
    };

    fetchDada();
  }, []);

  const tabItems = [
    {
      label: `Campaigns ${camps.length}`,
      key: "campaigns",
      children: <Table dataSource={camps} columns={campaignColumns} rowKey={"id"} />,
    },
    {
      label: `Line items ${li.length}`,
      key: "lineItems",
      children: <Table dataSource={li} columns={lineItemColumns} rowKey={"id"} />,
    },
    {
      label: `Ads ${ads.length}`,
      key: "ads",
      children: <Table dataSource={ads} columns={adColumns} rowKey={"id"} />,
    },
  ];

  return (
    <div>
      <Tabs onChange={onChange} type="card" items={tabItems} />
    </div>
  );
};
