import { Button, Tabs } from "antd";

import { useTable } from "./hooks/useTable";
import { useState } from "react";
import { TabNames } from "../../consts/consts";
import { Select } from "../../shared/components/Select/Select";
import { axios } from "../../services/config";

export const AdvertisementPage = () => {
  const [tabName, setTabName] = useState(TabNames.Campaigns);

  const { tabItems } = useTable({ tabName });

  const onChange = (key: TabNames) => {
    setTabName(key);
  };

  const fetchFn = async (search: string) => {
    const { data } = await axios.get("/options", {
      params: {
        search: search,
      },
    });

    return data;
  };

  return (
    <div>
      <Select fetchFn={fetchFn} placeholder="with request" />
      <Select placeholder="default" />
      <Tabs onChange={onChange} type="card" items={tabItems} />
    </div>
  );
};
