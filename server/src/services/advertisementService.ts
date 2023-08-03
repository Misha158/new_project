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

  getLineItems = async (search?: string) => {
    let sql = "SELECT * FROM line_items";

    if (search) {
      sql += " WHERE status LIKE ? OR title LIKE ? OR id LIKE ?";
    }
    const searchValue = `%${search}%`;

    try {
      const [rows, fields] = await pool.promise().query(sql, [searchValue, searchValue, searchValue]);

      return rows;
    } catch (err) {
      throw err;
    }
  };

  getAds = async () => {
    const sql = "SELECT * FROM ads";

    try {
      const [rows, fields] = await pool.promise().query(sql);

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
}

export default new AdvertisementService();
