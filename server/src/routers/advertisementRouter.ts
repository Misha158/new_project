import express from "express";
import AdvertisementController from "../controllers/advertisementController";

const advertisementRouter = express.Router();

advertisementRouter.get("/campaigns", AdvertisementController.getCampaigns);
advertisementRouter.get("/lineItems", AdvertisementController.getLineItems);
advertisementRouter.get("/ads", AdvertisementController.getAds);

advertisementRouter.post("/createAds", AdvertisementController.createAds);

export default advertisementRouter;
