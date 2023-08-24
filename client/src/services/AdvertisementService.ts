import axios from "axios";

export class AdvertisementService {
  static getCampaigns = async () => {
    const { data } = await axios.get("http://localhost:3000/advertisement/campaigns");

    return data;
  };

  static getLineItems = async ({ selectedCampaignIds = [] }: { selectedCampaignIds?: number[] }) => {
    const { data } = await axios.get(`http://localhost:3000/advertisement/lineItems`, {
      params: {
        campaignIds: `[${selectedCampaignIds.join(",")}]`,
      },
    });

    return data;
  };

  static getAds = async ({
    selectedCampaignIds = [],
    selectedLineItemIds = [],
  }: {
    selectedCampaignIds?: number[];
    selectedLineItemIds?: number[];
  }) => {
    const { data } = await axios.get(`http://localhost:3000/advertisement/ads`, {
      params: {
        campaignIds: `[${selectedCampaignIds.join(",")}]`,
        lineItemIds: `[${selectedLineItemIds.join(",")}]`,
      },
    });

    return data;
  };

  static deleteAds = async ({ adIds }: { adIds: number[] }) => {
    const { data } = await axios.post(`http://localhost:3000/advertisement/ads`, {
      adIds,
    });

    return data;
  };
}
