import React from "react";
import { Tabs } from "antd";

import { useTableData } from "./useTableData";

const onChange = (key: string) => {
  console.log(key);
};

export const AdvertisementPage = () => {
  const { tabItems } = useTableData();

  return (
    <div>
      <Tabs onChange={onChange} type="card" items={tabItems} />
    </div>
  );
};
