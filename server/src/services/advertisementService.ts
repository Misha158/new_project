import { Op } from "sequelize";
import Campaign from "../Models/Campaign";
import LineItem from "../Models/LineItem";
import Ad, { IAd } from "../Models/Ad";

const withSearch = (search: string) => ({
  where: {
    [Op.or]: [{ id: { [Op.like]: `%${search}%` } }, { status: { [Op.like]: `%${search}%` } }, { title: { [Op.like]: `%${search}%` } }],
  },
});

const withCampaignIds = (campaignIds: number[]) => ({
  where: { campaign_id: { [Op.in]: campaignIds } },
});

const withLineItemIds = (lineItemIds: number[]) => ({
  where: { line_item_id: { [Op.in]: lineItemIds } },
});

const withAdIds = (adsIds: number[]) => ({
  where: {
    id: {
      [Op.in]: adsIds,
    },
  },
});

class AdvertisementService {
  getCampaigns = async () => {
    try {
      return await Campaign.findAll();
    } catch (err) {
      throw err;
    }
  };

  getLineItems = async (search?: string, campaignIds = [] as number[]) => {
    try {
      if (search) {
        return await LineItem.findAll(withSearch(search));
      }

      if (campaignIds.length) {
        return await LineItem.findAll(withCampaignIds(campaignIds));
      }

      return await LineItem.findAll();
    } catch (err) {
      throw err;
    }
  };

  getAds = async ({ campaignIds, lineItemIds }: { campaignIds: number[]; lineItemIds: number[] }) => {
    if (campaignIds?.length && !lineItemIds.length) {
      return await Ad.findAll(withCampaignIds(campaignIds));
    } else if (lineItemIds?.length) {
      return await Ad.findAll(withLineItemIds(lineItemIds));
    }

    try {
      return await Ad.findAll();
    } catch (err) {
      throw err;
    }
  };

  createAds = async (adsForCreate: IAd[]) => {
    try {
      return await Ad.bulkCreate(adsForCreate);
    } catch (err) {
      throw err;
    }
  };

  deleteAds = async (adsIds: number[]) => {
    try {
      const adsToDelete = await Ad.findAll(withAdIds(adsIds));

      await Ad.destroy(withAdIds(adsIds));

      return adsToDelete;
    } catch (err) {
      throw err;
    }
  };
}

export default new AdvertisementService();
