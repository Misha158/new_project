import { axios } from "./config";

export class AdvertisementService {
  static getCampaigns = async () => {
    try {
      const { data } = await axios.get("/advertisement/campaigns");

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static getLineItems = async ({ selectedCampaignIds = [] }: { selectedCampaignIds?: number[] }) => {
    try {
      const { data } = await axios.get(`/advertisement/lineItems`, {
        params: {
          campaignIds: `[${selectedCampaignIds.join(",")}]`,
        },
      });

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static getAds = async ({
    selectedCampaignIds = [],
    selectedLineItemIds = [],
  }: {
    selectedCampaignIds?: number[];
    selectedLineItemIds?: number[];
  }) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/advertisement/ads`, {
        params: {
          campaignIds: `[${selectedCampaignIds.join(",")}]`,
          lineItemIds: `[${selectedLineItemIds.join(",")}]`,
        },
      });

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static deleteAds = async ({ adIds }: { adIds: number[] }) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/advertisement/ads`, {
        data: adIds,
      });

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };
}
