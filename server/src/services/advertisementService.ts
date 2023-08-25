import { pool } from "../index";

class AdvertisementService {
  getCampaigns = async () => {
    const sql = "SELECT * FROM campaigns";

    try {
      const [rows, fields] = await pool.promise().query(sql);

      return rows;
    } catch (err) {
      throw err;
    }
  };

  getLineItems = async (search?: string, campaignIds = [] as number[]) => {
    const isFilterByCampaignIds = campaignIds?.length > 0;
    let sql = "SELECT * FROM line_items";

    if (search) {
      sql += " WHERE status LIKE ? OR title LIKE ? OR id LIKE ?";
    }

    if (isFilterByCampaignIds) {
      const placeholders = campaignIds.map(() => "?").join(", ");
      sql += ` WHERE campaign_id IN (${placeholders})`;
    }

    const searchValue = `%${search}%`;

    try {
      const searchQueryOrCampaignIds = isFilterByCampaignIds ? campaignIds : [searchValue, searchValue, searchValue];
      const [rows, fields] = await pool.promise().query(sql, searchQueryOrCampaignIds);

      return rows;
    } catch (err) {
      throw err;
    }
  };

  getAds = async ({ campaignIds, lineItemIds }: { campaignIds: number[]; lineItemIds: number[] }) => {
    const isFilterByCampaignIds = campaignIds?.length > 0;
    const isFilterByLineItemIds = lineItemIds?.length > 0;

    let sql = "SELECT * FROM ads";

    if (campaignIds?.length && !lineItemIds.length) {
      const placeholders = campaignIds.map(() => "?").join(", ");
      sql += ` WHERE campaign_id IN (${placeholders})`;
    } else if (lineItemIds?.length) {
      const placeholders = lineItemIds.map(() => "?").join(", ");
      sql += ` WHERE line_item_id IN (${placeholders})`;
    }

    const queryParams = (isFilterByLineItemIds && lineItemIds) || (isFilterByCampaignIds && campaignIds) || false;

    try {
      const [rows, fields] = await pool.promise().query(sql, queryParams);

      return rows;
    } catch (err) {
      throw err;
    }
  };

  createAds = async (adsForCreate: Record<string, string | number>[]) => {
    const sql = "INSERT INTO ads (title, status, line_item_id, campaign_id) VALUES ?";

    const adsData = adsForCreate.reduce<(string | number)[][]>((acc, current) => {
      acc.push([`${current.title}`, `${current.status}`, current.line_item_id, current.campaign_id]);

      return acc;
    }, []);

    try {
      const result = await pool.promise().query(sql, [adsData]);

      return result;
    } catch (err) {
      throw err;
    }
  };

  deleteAds = async (adsIds: number[]) => {
    const placeholders = adsIds.map(() => "?").join(", ");
    const deleteSql = `DELETE FROM ads WHERE id IN (${placeholders})`;

    const fetchSql = `SELECT * FROM ads WHERE id IN (?)`;

    try {
      const fetchedRecords = await pool.promise().query(fetchSql, [adsIds]);
      await pool.promise().query(deleteSql, adsIds);

      return fetchedRecords[0];
    } catch (err) {
      throw err;
    }
  };
}

export default new AdvertisementService();
