import express from "express";
import AdvertisementController from "../controllers/advertisementController";

const advertisementRouter = express.Router();

advertisementRouter.get("/campaigns", AdvertisementController.getCampaigns);
advertisementRouter.get("/lineItems", AdvertisementController.getLineItems);
advertisementRouter.get("/ads", AdvertisementController.getAds);

export default advertisementRouter;
