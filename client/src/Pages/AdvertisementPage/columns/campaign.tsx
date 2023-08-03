const generalColumns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

export const campaignColumns = [
  ...generalColumns,
  {
    title: "Line item id",
    dataIndex: "line_item_id",
    key: "line_item_id",
  },
];

export const lineItemColumns = [
  ...generalColumns,
  {
    title: "Campaign id",
    dataIndex: "campaign_id",
    key: "campaign_id",
  },

  {
    title: "Ad id",
    dataIndex: "ad_id",
    key: "ad_id",
  },
];

export const adColumns = [
  ...generalColumns,
  {
    title: "Campaign id",
    dataIndex: "campaign_id",
    key: "campaign_id",
  },

  {
    title: "Line item id",
    dataIndex: "line_item_id",
    key: "line_item_id",
  },
];
