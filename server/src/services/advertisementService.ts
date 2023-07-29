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

  getLineItems = async () => {
    const sql = "SELECT * FROM line_items";

    try {
      const [rows, fields] = await pool.promise().query(sql);

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
}

export default new AdvertisementService();
