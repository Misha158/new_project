import React from "react";

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
    dataIndex: "lineItemId",
    key: "lineItemId",
  },
];

export const lineItemColumns = [
  ...generalColumns,
  {
    title: "Campaign id",
    dataIndex: "campaignId",
    key: "campaignId",
  },

  {
    title: "Ad id",
    dataIndex: "adId",
    key: "adId",
  },
];

export const adColumns = [
  ...generalColumns,
  {
    title: "Campaign id",
    dataIndex: "campaignId",
    key: "campaignId",
  },

  {
    title: "Line item id",
    dataIndex: "lineItemId",
    key: "lineItemId",
  },
];
