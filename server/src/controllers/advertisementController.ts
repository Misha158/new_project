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
    const { search, campaignIds } = req.query;

    const typedSearch = search as string;
    const parsedCampaigns = campaignIds ? JSON.parse(campaignIds as string) : [];

    try {
      const lineItems = await AdvertisementService.getLineItems(typedSearch, parsedCampaigns);

      res.status(200).json(lineItems);
    } catch (err) {
      res.status(500).send("Error with line items.");
    }
  };

  getAds = async (req: Request, res: Response) => {
    const { campaignIds, lineItemIds } = req.query;
    const parsedCampaigns = campaignIds ? JSON.parse(campaignIds as string) : [];
    const parsedLineItems = lineItemIds ? JSON.parse(lineItemIds as string) : [];

    try {
      const ads = await AdvertisementService.getAds({ campaignIds: parsedCampaigns, lineItemIds: parsedLineItems });

      res.status(200).json(ads);
    } catch (err) {
      res.status(500).send("Error with ads.");
    }
  };

  createAds = async (req: Request, res: Response) => {
    try {
      const ads = await AdvertisementService.createAds(req.body);

      res.status(200).json(ads);

      // setTimeout(() => {
      //   res.status(200).json(ads);
      // }, 4000);
    } catch (err) {
      res.status(500).send("Error with ads.");
    }
  };

  deleteAds = async (req: Request, res: Response) => {
    const adsIds = req.body;

    try {
      const ads = await AdvertisementService.deleteAds(adsIds);

      res.status(200).json(ads);
    } catch (err) {
      res.status(500).send("Error with ads.");
    }
  };
}

export default new AdvertisementController();
