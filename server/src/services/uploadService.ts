import { Op, Sequelize, fn } from "sequelize";

class AdvertisementService {
  upload = async ({ status, search }: { status?: string; search?: string }) => {
    try {
      return;
    } catch (err) {
      throw err;
    }
  };
}

export default new AdvertisementService();
