import { message } from "antd";
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
      message.error(`Campaigns failed with ${e.message}`);
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
      message.error(`LineItems failed with ${e.message}`);
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
      message.error(`Ads failed with ${e.message}`);
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
      message.error(`Delete failed with ${e.message}`);
      throw new Error(e.message);
    }
  };
}
