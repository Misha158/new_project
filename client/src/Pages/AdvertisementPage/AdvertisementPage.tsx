import { Tabs } from "antd";

import { useTable } from "./hooks/useTable";
import { useState } from "react";
import { TabNames } from "../../consts/consts";

export const AdvertisementPage = () => {
  const [tabName, setTabName] = useState(TabNames.Campaigns);

  const { tabItems } = useTable({ tabName });

  const onChange = (key: TabNames) => {
    setTabName(key);
  };

  return (
    <div>
      <Tabs onChange={onChange} type="card" items={tabItems} />
    </div>
  );
};
