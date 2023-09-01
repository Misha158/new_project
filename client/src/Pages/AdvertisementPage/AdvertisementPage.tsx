import { useState } from "react";
import { Tabs } from "antd";

import { useTable } from "./hooks/useTable";
import { Filters } from "./Filters/Filters";
import { TabNames } from "../../consts/consts";

export const AdvertisementPage = () => {
  const [tabName, setTabName] = useState(TabNames.Campaigns);

  const { tabItems, setAds, setCampaigns, setLineItems } = useTable({ tabName });

  const onChange = (key: TabNames) => {
    setTabName(key);
  };

  return (
    <div>
      <Filters setAds={setAds} setCampaigns={setCampaigns} setLineItems={setLineItems} />
      <Tabs onChange={onChange} type="card" items={tabItems} />
    </div>
  );
};
