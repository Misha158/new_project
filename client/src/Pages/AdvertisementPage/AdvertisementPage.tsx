import { Tabs } from "antd";

import { useTable } from "./useTableData";

const onChange = (key: string) => {
  console.log(key);
};

export const AdvertisementPage = () => {
  const { tabItems } = useTable();

  return (
    <div>
      <Tabs onChange={onChange} type="card" items={tabItems} />
    </div>
  );
};
