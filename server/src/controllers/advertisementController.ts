import { Request, Response } from "express";
import AdvertisementService from "../services/advertisementService";

class AdvertisementController {
  getCampaigns = async (req: Request, res: Response) => {
    try {
      const campaigns = await AdvertisementService.getCampaigns();

      res.status(200).json(campaigns);
    } catch (err) {
      res.status(500).send("Error with campaigns");
    }
  };

  getLineItems = async (req: Request, res: Response) => {
    const { search } = req.body;

    try {
      const lineItems = await AdvertisementService.getLineItems(search);

      res.status(200).json(lineItems);
    } catch (err) {
      res.status(500).send("Error with line items.");
    }
  };

  getAds = async (req: Request, res: Response) => {
    try {
      const ads = await AdvertisementService.getAds();

      res.status(200).json(ads);
    } catch (err) {
      res.status(500).send("Error with ads.");
    }
  };

  createAds = async (req: Request, res: Response) => {
    try {
      const ads = await AdvertisementService.createAds(req.body);

      res.status(200).json(ads);
    } catch (err) {
      res.status(500).send("Error with ads.");
    }
  };
}

export default new AdvertisementController();
