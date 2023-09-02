import { Op, literal, Sequelize, fn } from "sequelize";
import { identity, pickBy } from "lodash";
import Campaign from "../Models/Campaign";
import LineItem from "../Models/LineItem";
import Ad, { IAd } from "../Models/Ad";
import Status from "../Models/Status";

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

interface FilterOptions {
  campaignIds?: number[];
  lineItemIds?: number[];
  search?: string;
  status?: string;
}

const filterOptions = ({ campaignIds, lineItemIds, search, status }: FilterOptions) => ({
  ...(campaignIds?.length ? { campaign_id: { [Op.in]: campaignIds } } : {}),
  ...(lineItemIds?.length ? { line_item_id: { [Op.in]: lineItemIds } } : {}),
  ...(status ? { "$status.title$": status } : {}),
  ...(search
    ? { [Op.or]: [{ id: { [Op.like]: `%${search}%` } }, { "$status.title$": { [Op.like]: `%${search}%` } }, { title: { [Op.like]: `%${search}%` } }] }
    : {}),
});

const withAdIds = (adsIds: number[]) => ({
  where: {
    id: {
      [Op.in]: adsIds,
    },
  },
});

const getWhere = (status?: string) =>
  status
    ? {
        "$status.title$": status,
      }
    : {};

class AdvertisementService {
  getCampaigns = async ({ status }: { status?: string }) => {
    try {
      return await Campaign.findAll({
        where: getWhere(status),
        raw: true, // Устанавливаем опцию raw: true для модели Status
        group: ["Campaign.id"], // Группируем результат по идентификатору Campaign
        attributes: ["id", "title", [fn("group_concat", Sequelize.col("Status.title")), "status"]],
        include: [
          {
            model: Status, // Модель, которую вы хотите включить
            as: "status", // Псевдоним для связи
            attributes: [], // Оставляем пустой массив атрибутов для модели Status
          },
        ],
      });
    } catch (err) {
      throw err;
    }
  };

  getLineItems = async ({ search, campaignIds = [], status }: { search?: string; campaignIds: number[]; status?: string }) => {
    try {
      return await LineItem.findAll({
        where: filterOptions({ search, campaignIds, status }),
        raw: true,
        group: ["LineItem.id"],
        attributes: ["id", "title", "campaign_id", [fn("group_concat", Sequelize.col("Status.title")), "status"]],
        include: [
          {
            model: Status,
            as: "status",
            attributes: [],
          },
        ],
      });
    } catch (err) {
      throw err;
    }
  };

  getAds = async ({ campaignIds, lineItemIds, status }: { campaignIds: number[]; lineItemIds: number[]; status?: string }) => {
    const filterOptions = ({ campaignIds, lineItemIds, status }: { campaignIds?: number[]; lineItemIds?: number[]; status?: string }) => ({
      ...(campaignIds?.length && !lineItemIds?.length ? { campaign_id: { [Op.in]: campaignIds } } : {}),
      ...(lineItemIds?.length ? { line_item_id: { [Op.in]: lineItemIds } } : {}),
      ...(status
        ? {
            "$status.title$": status,
          }
        : {}),
    });

    try {
      return await Ad.findAll({
        where: filterOptions({ campaignIds, lineItemIds, status }),
        raw: true,
        group: ["Ad.id"],
        attributes: ["id", "title", "campaign_id", "line_item_id", [fn("group_concat", Sequelize.col("Status.title")), "status"]],
        include: [
          {
            model: Status,
            as: "status",
            attributes: [],
          },
        ],
      });
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
