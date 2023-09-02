import { axios } from "./config";

export class AdvertisementService {
  static getCampaigns = async ({ status }: { status?: string }) => {
    try {
      const { data } = await axios.get("/advertisement/campaigns", {
        params: {
          status,
        },
      });

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static getLineItems = async ({ selectedCampaignIds = [], status }: { selectedCampaignIds?: number[]; status?: string }) => {
    try {
      const { data } = await axios.get(`/advertisement/lineItems`, {
        params: {
          campaignIds: selectedCampaignIds.length ? `[${selectedCampaignIds.join(",")}]` : undefined,
          status,
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
    status,
  }: {
    selectedCampaignIds?: number[];
    selectedLineItemIds?: number[];
    status?: string;
  }) => {
    try {
      const { data } = await axios.get(`/advertisement/ads`, {
        params: {
          campaignIds: selectedCampaignIds.length ? `[${selectedCampaignIds.join(",")}]` : undefined,
          lineItemIds: selectedLineItemIds.length ? `[${selectedLineItemIds.join(",")}]` : undefined,
          status,
        },
      });

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static deleteAds = async ({ adIds }: { adIds: number[] }) => {
    try {
      const { data } = await axios.delete(`/advertisement/ads`, {
        data: adIds,
      });

      return data;
    } catch (e) {
      throw new Error(e.message);
    }
  };
}
