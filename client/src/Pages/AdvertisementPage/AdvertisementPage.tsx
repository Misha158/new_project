import { useState } from "react";
import { Tabs } from "antd";

import { useTable } from "./hooks/useTable";
import { Filters } from "./Filters/Filters";
import { TabNames } from "../../consts/consts";
import { ReduxCounter } from "../../shared/components/redux/ReduxCounter";

export const AdvertisementPage = () => {
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [tabName, setTabName] = useState(TabNames.Campaigns);

  const { tabItems, setAds, setCampaigns, setLineItems, selectedLineItemIds, selectedCampaignIds } = useTable({ tabName, status });

  const onChange = (key: TabNames) => {
    setTabName(key);
  };

  return (
    <div>
      {/*<ReduxCounter />*/}
      <Filters
        selectedCampaignIds={selectedCampaignIds}
        selectedLineItemIds={selectedLineItemIds}
        setStatus={setStatus}
        setAds={setAds}
        setCampaigns={setCampaigns}
        setLineItems={setLineItems}
        status={status}
      />
      <Tabs onChange={onChange} type="card" items={tabItems} />
    </div>
  );
};
