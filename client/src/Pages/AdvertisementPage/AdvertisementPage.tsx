import { Tabs } from "antd";

import { useTable } from "./useTableData";
import { useState } from "react";

export const AdvertisementPage = () => {
  const [tabName, setTabName] = useState("campaigns");
  const { tabItems } = useTable({ tabName });

  const onChange = (key: string) => {
    setTabName(key);
  };

  console.log("tabName", tabName);

  return (
    <div>
      <Tabs onChange={onChange} type="card" items={tabItems} />
    </div>
  );
};
